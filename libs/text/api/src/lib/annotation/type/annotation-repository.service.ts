import {
  AnnotationExample,
  AnnotationLink,
  AnnotationSelector,
  ExampleDto,
  PURPOSE_ANNOTATION_SELECT,
  PURPOSE_EXAMPLE,
  PURPOSE_TRANSLATION,
} from '@mela/text/shared';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import {
  Annotation,
  AnnotationWithRelations,
} from '@ghentcdh/mela/generated/types';

import { AnnotationRepository } from '../annotation-repository.service';
import { AnnotationTypeDto } from './annotation-type.schema';
import { createExample } from './utils/create-example';
import { createLinks } from './utils/create-links';
import { createSelector, getTextSelection } from './utils/create-selector';
import { ExampleRepository } from '../../example/example-repository.service';

@Injectable()
export class AnnotationTypeRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly annotationRepository: AnnotationRepository,
    private readonly exampleRepository: ExampleRepository,
  ) {}

  async create(data: AnnotationTypeDto) {
    let createdAnnotation: Annotation;
    switch (data.type) {
      case PURPOSE_TRANSLATION:
        createdAnnotation = await this.updateLinks(
          null,
          data as AnnotationLink,
        );
        break;
      case PURPOSE_ANNOTATION_SELECT:
        createdAnnotation = await this.updateTextSelection(
          null,
          data as AnnotationSelector,
        );
        break;
      case PURPOSE_EXAMPLE:
        createdAnnotation = await this.updateExample(
          null,
          data as AnnotationExample,
        );
        break;
      default:
        throw new BadRequestException('Invalid annotation type');
    }

    return this.annotationRepository.findOne(createdAnnotation.id);
  }

  async update(id: string, data: AnnotationTypeDto) {
    let updatedAnnotation: Annotation;
    switch (data.type) {
      case PURPOSE_TRANSLATION:
        updatedAnnotation = await this.updateLinks(id, data as AnnotationLink);
        break;
      case PURPOSE_ANNOTATION_SELECT:
        updatedAnnotation = await this.updateTextSelection(
          id,
          data as AnnotationSelector,
        );
        break;
      case PURPOSE_EXAMPLE:
        updatedAnnotation = await this.updateExample(
          id,
          data as AnnotationExample,
        );
        break;
      default:
        throw new BadRequestException('Invalid annotation type');
    }
    return this.annotationRepository.findOne(updatedAnnotation.id);
  }

  async delete(id: string) {
    const annotation = (await this.annotationRepository.findOne(
      id,
    )) as AnnotationWithRelations;

    const relatedAnnotations = [
      (
        await this.prisma.annotationTarget.findMany({
          where: {
            source_id: id,
            source_type: 'annotation',
          },
        })
      ).map((a) => a.annotation_id),
      id,
    ].flat();

    const sources = [
      annotation.annotationBody.filter((b) => b.source_type),
      annotation.annotationTarget.filter((t) => t.source_type),
    ].flat();

    const examples = sources
      .filter((s) => s.source_type === 'example')
      .map((s) => s.source_id) as string[];

    return Promise.all([
      this.prisma.annotation.deleteMany({
        where: { id: { in: relatedAnnotations } },
      }),
      this.prisma.example.deleteMany({ where: { id: { in: examples } } }),
    ]);
  }

  // region example
  private async updateExample(id: string | null, data: AnnotationExample) {
    const textContent = await this.prisma.textContent.findFirstOrThrow({
      where: { id: data.textContent.id },
    });

    const exampledto = {
      register: data.example.register,
      name: getTextSelection(textContent, data.annotation),
      textContent,
    } as ExampleDto;

    const example = await (data.example.id
      ? this.exampleRepository.update(data.example.id!, exampledto)
      : this.exampleRepository.create(exampledto));

    const annotation = createExample(example, textContent, data.annotation);

    if (!id) return this.annotationRepository.create(annotation);
    return this.annotationRepository.update(id, annotation);
  }

  // endregion

  // region textselection
  private async updateTextSelection(
    id: string | null,
    data: AnnotationSelector,
  ) {
    const textContent = await this.prisma.textContent.findFirstOrThrow({
      where: { id: data.textContent.id },
    });
    const annotation = createSelector(textContent, data.annotation);

    if (!id) return this.annotationRepository.create(annotation);
    return this.annotationRepository.update(id, annotation);
  }

  // endregion

  // region links
  private async updateLinks(id: string | null, data: AnnotationLink) {
    const annotations = await this.annotationRepository.findAnnotations(
      data.annotations,
    );

    const linkedAnnotation = createLinks(data.text, data.type, annotations);

    if (!id) return this.annotationRepository.create(linkedAnnotation);

    return this.annotationRepository.update(id, linkedAnnotation);
  }

  // endregion
}

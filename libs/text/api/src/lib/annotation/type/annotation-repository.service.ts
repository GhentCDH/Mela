import {
  AnnotationExample,
  AnnotationExampleLemma,
  AnnotationLink,
  AnnotationSelector,
  ExampleDto,
  PURPOSE_ANNOTATION_SELECT,
  PURPOSE_EXAMPLE,
  PURPOSE_LEMA,
  PURPOSE_LINK_BUCKETS,
  PURPOSE_TRANSLATION,
} from '@mela/text/shared';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import {
  Annotation,
  AnnotationWithRelations,
  Lemma,
  TextContent,
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
      case PURPOSE_LINK_BUCKETS:
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
      case PURPOSE_LEMA:
        createdAnnotation = await this.updateLemma(
          null,
          data as AnnotationExampleLemma,
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

    const sourceTypeDelete = ['example'];

    const deleteRelated = sources
      .filter((s) => sourceTypeDelete.includes(s.source_type))
      .map((s) => s.source_id) as string[];

    // TODO delete linked lemma annotation

    return Promise.all([
      this.prisma.annotation.deleteMany({
        where: { id: { in: relatedAnnotations } },
      }),
      this.prisma.example.deleteMany({ where: { id: { in: deleteRelated } } }),
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

    const linkedAnnotation = createLinks(
      data.text,
      data.type,
      annotations,
      data.value,
    );

    if (!id) return this.annotationRepository.create(linkedAnnotation);

    return this.annotationRepository.update(id, linkedAnnotation);
  }

  // endregion

  // region lemma
  private async updateLemma(id: string | null, data: AnnotationExampleLemma) {
    // 1.
    //    a. find the text content
    //    b. find or create the lemma
    //    c. find or create the example
    const [textContent, lemma, exampleAnnotation] = await Promise.all([
      this.prisma.textContent.findFirstOrThrow({
        where: { id: data.textContent.id },
      }),
      this.prisma.lemma.findFirstOrThrow({ where: { id: data.lemma.id } }),
      this.prisma.annotation.findFirstOrThrow({
        where: { id: data.exampleAnnotation.id },
      }),
    ]);

    // 2. Check if the example is the one of the annotation

    // 3. find or create the annotation for the lemma
    const selectionAnnotation = await this.updateLemmaExampleSelection(
      id,
      textContent,
      data,
    );

    // 4. create the lemma annotation with a link betrween the lemma and the example
    return this.updateLemmaExampleLink(
      id,
      textContent,
      lemma,
      exampleAnnotation,
      selectionAnnotation,
    );
  }

  private async updateLemmaExampleSelection(
    id: string | null,
    textContent: TextContent,
    data: AnnotationExampleLemma,
  ) {
    const annotation = createSelector(textContent, {
      ...data.annotation,
      tagging: PURPOSE_LEMA,
    });

    if (!id) return this.annotationRepository.create(annotation);
    return this.annotationRepository.update(id, annotation);
  }

  private async updateLemmaExampleLink(
    id: string | null,
    textContent: TextContent,
    lemma: Lemma,
    exampleAnnotation: Annotation,
    selectionAnnotation: Annotation,
  ) {
    const annotations = [exampleAnnotation, selectionAnnotation];

    const linkedAnnotation = createLinks(
      { id: textContent.text_id },
      PURPOSE_LEMA,
      annotations,
      lemma,
    );

    if (!id) return this.annotationRepository.create(linkedAnnotation);

    return this.annotationRepository.update(id, linkedAnnotation);
  }

  // endregion
}

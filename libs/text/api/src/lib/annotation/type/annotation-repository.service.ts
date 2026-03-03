import {
  AnnotationExample,
  AnnotationExampleLemma,
  AnnotationLink,
  AnnotationSelector,
  PURPOSE_ANNOTATION_SELECT,
  PURPOSE_EXAMPLE,
  PURPOSE_LEMA,
  PURPOSE_LINK_BUCKETS,
  PURPOSE_TRANSLATION,
} from '@mela/text/shared';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@mela/generated-prisma';
import {
  Annotation,
  AnnotationNewWithRelations,
  LemmaWithRelations,
  TextContent,
} from '@mela/generated-types';

import { AnnotationRepository } from '../annotation-repository.service';
import { AnnotationTypeDto } from './annotation-type.schema';
import { createLemma } from './utils/create-lemma';
import { createLinks } from './utils/create-links';
import { RegisterRepository } from '../../register/register-repository.service';

@Injectable()
export class AnnotationTypeRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly annotationRepository: AnnotationRepository,
    private readonly registerRepository: RegisterRepository,
  ) {}

  async create(data: AnnotationTypeDto) {
    return this.createOrUpdate(null, data);
  }

  async update(id: string, data: AnnotationTypeDto) {
    return this.createOrUpdate(id, data);
  }

  private async createOrUpdate(id: string | null, data: AnnotationTypeDto) {
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
      case PURPOSE_LEMA:
        updatedAnnotation = await this.updateLemma(
          id,
          data as AnnotationExampleLemma,
        );
        break;
      case PURPOSE_LINK_BUCKETS:
        updatedAnnotation = await this.updateLinks(id, data as AnnotationLink);
        break;
      default:
        throw new BadRequestException('Invalid annotation type');
    }

    return this.annotationRepository.findOne(updatedAnnotation.id);
  }

  async delete(id: string) {
    const annotation = (await this.annotationRepository.findOne(
      id,
    )) as AnnotationNewWithRelations;

    const relatedAnnotations = [
      //   (
      //     await this.prisma.annotationTarget.findMany({
      //       where: {
      //         source_id: id,
      //         source_type: 'annotation',
      //       },
      //     })
      //   ).map((a) => a.annotation_id),
      id,
    ].flat();

    // const sources = [
    //   annotation.annotationBody.filter((b) => b.source_type),
    //   annotation.annotationTarget.filter((t) => t.source_type),
    // ].flat();

    // const sourceTypeDelete = ['example'];
    //
    // const deleteRelated = sources
    //   .filter((s) => sourceTypeDelete.includes(s.source_type))
    //   .map((s) => s.source_id) as string[];

    // TODO delete linked lemma annotation

    return Promise.all([
      this.prisma.annotationNew.deleteMany({
        where: { id: { in: relatedAnnotations } },
      }),
      // this.prisma.example.deleteMany({ where: { id: { in: deleteRelated } } }),
    ]);
  }

  // region example
  private async updateExample(id: string | null, data: AnnotationExample) {
    // const textContent = await this.prisma.textContent.findFirstOrThrow({
    //   where: { id: data.textContent.id },
    // });
    //
    // const exampledto = {
    //   register: data.example.register,
    //   name: getTextSelection(textContent, data.annotation),
    //   textContent,
    // } as ExampleDto;
    //
    // const example = await (data.example.id
    //   ? this.exampleRepository.update(data.example.id!, exampledto)
    //   : this.exampleRepository.create(exampledto));

    const register = this.registerRepository.findOrCreate(
      data.example.register,
    );

    return this.updateTextSelection(id, data, {
      register,
    });
    //
    // const annotation = createExample(example, textContent, data.annotation);
    //
    // if (!id) return this.annotationRepository.create(annotation);
    // return this.annotationRepository.update(id, annotation);
  }

  // endregion

  private async getType(data: AnnotationSelector) {
    return this.prisma.annotationDef.findFirstOrThrow({
      where: { id: data.annotation.tagging },
    });
  }

  private async getSectionText(data: AnnotationSelector) {
    return this.prisma.sectionText.findFirstOrThrow({
      where: { id: data.textContent.id },
    });
  }

  // region textselection
  private async updateTextSelection(
    id: string | null,
    data: AnnotationSelector,
    value: any = {},
  ) {
    const [type, sectionText] = await Promise.all([
      this.getType(data),
      this.getSectionText(data),
    ]);

    // TODO validate value against json schema

    const { start, end } = data.annotation;
    const prefixStart = Math.max(start - 5, 0);
    const prefix = sectionText.content.substring(
      prefixStart,
      data.annotation.start,
    );
    const suffixEnd = Math.min(end + 5, sectionText.content.length);
    const suffix = sectionText.content.substring(
      data.annotation.end,
      suffixEnd,
    );

    if (!id) {
      return this.prisma.annotationNew.create({
        data: {
          type: { connect: { id: type.id } },
          value,
          textSelector: {
            create: {
              start,
              end,
              suffix,
              prefix,
              sectionText: { connect: { id: sectionText.id } },
            },
          },
        },
      });
    }

    return this.prisma.annotationNew.update({
      where: { id },
      data: {
        type: { connect: { id: type.id } },
        value,
        textSelector: {
          update: {
            sectionText: { connect: { id: sectionText.id } },
            start,
            end,
            suffix,
            prefix,
          },
        },
      },
    });
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
      lemma,
      textContent,
      data,
    );

    // 4. create the lemma annotation with a link betrween the lemma and the example
    return this.updateLemmaExampleLink(
      id,
      textContent,
      exampleAnnotation,
      selectionAnnotation,
    );
  }

  private async updateLemmaExampleSelection(
    id: string | null,
    lemma: LemmaWithRelations,
    textContent: TextContent,
    data: AnnotationExampleLemma,
  ) {
    const annotation = createLemma(lemma, textContent, data.annotation);

    if (!id) return this.annotationRepository.create(annotation);
    return this.annotationRepository.update(id, annotation);
  }

  private async updateLemmaExampleLink(
    id: string | null,
    textContent: TextContent,
    exampleAnnotation: Annotation,
    selectionAnnotation: Annotation,
  ) {
    const annotations = [exampleAnnotation, selectionAnnotation];

    const linkedAnnotation = createLinks(
      { id: textContent.text_id },
      PURPOSE_LEMA,
      annotations,
    );

    if (!id) return this.annotationRepository.create(linkedAnnotation);

    return this.annotationRepository.update(id, linkedAnnotation);
  }

  // endregion
}

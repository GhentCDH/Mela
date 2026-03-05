import {
  AnnotationDto,
  AnnotationExample,
  AnnotationExampleLemma,
  AnnotationLink,
  PURPOSE_LEMA,
} from '@mela/text/shared';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@mela/generated-prisma';
import {
  Annotation,
  AnnotationDef,
  AnnotationNewWithRelations,
  LemmaWithRelations,
  TextContent,
} from '@mela/generated-types';

import { AnnotationRepository } from '../annotation-repository.service';
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

  async create(data: AnnotationDto) {
    return this.createOrUpdate(null, data);
  }

  async update(id: string, data: AnnotationDto) {
    return this.createOrUpdate(id, data);
  }

  async delete(id: string) {
    const annotation = (await this.annotationRepository.findOne(
      id,
    )) as AnnotationNewWithRelations;

    const relatedAnnotations = [
      // this.prisma.annotationRelation.findMany({
      //   where:{
      //     or:{
      //       annotation_from_id: id,
      //       annotation_to_id: id,
      //     }
      //   }
      // })
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

    const deleteRelations = await this.prisma.annotationRelation.deleteMany({
      where: {
        OR: {
          annotationFrom: { id: { in: relatedAnnotations } },
          annotationTo: { id: { in: relatedAnnotations } },
        },
      },
    });

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
    //
    // const annotation = createExample(example, textContent, data.annotation);
    //
    // if (!id) return this.annotationRepository.create(annotation);
    // return this.annotationRepository.update(id, annotation);
  }

  // endregion

  private async getType(type: string) {
    return this.prisma.annotationDef
      .findFirstOrThrow({
        where: { id: type },
      })
      .catch((eror) => {
        throw new BadRequestException(`Invalid annotation type: ${type}`);
      });
  }

  private async getSectionText(sectionTextId: string) {
    return this.prisma.sectionText
      .findFirstOrThrow({
        where: { id: sectionTextId },
      })
      .catch((eror) => {
        throw new BadRequestException(`Invalid text content: ${sectionTextId}`);
      });
  }

  // region textselection
  private async validateData(type: string, value: any) {
    const [_type] = await Promise.all([this.getType(type)]);

    // TODO validate value against json schema
    const valid = true;

    // TODO validate register
    // const register = this.registerRepository.findOrCreate(
    //   data.example.register,
    // );

    if (!valid) {
      throw new BadRequestException(
        `Invalid value for annotation type: ${type}`,
      );
    }

    return { type: _type, value: value ?? {} };
  }

  private async createAnnotation(
    id: string | null,
    type: AnnotationDef,
    value: any,
  ) {
    if (!id) {
      return this.prisma.annotationNew.create({
        data: {
          type: { connect: { id: type.id } },
          value,
        },
      });
    }

    return this.prisma.annotationNew.update({
      where: { id },
      data: {
        type: { connect: { id: type.id } },
        value,
      },
    });
  }

  async updateLink(id: string | null, data: AnnotationLink) {
    const [{ type, value }] = await Promise.all([
      this.validateData(data.type, data.value),
    ]);

    const annotation = await this.createAnnotation(id, type, value);

    // create the relations, if it already exist skip it
    await this.prisma.annotationRelation.createMany({
      data: data.annotations.map(({ id }) => ({
        annotation_from_id: annotation.id,
        annotation_to_id: id,
      })),
    });

    return annotation;
  }

  private async getTextSelector(data: AnnotationDto) {
    const _textSelector = data.textSelector;
    if (!_textSelector) return null;

    const sectionText = await this.getSectionText(_textSelector.sectionTextId);
    const { start, end } = _textSelector;
    const prefixStart = Math.max(start - 5, 0);
    const prefix = sectionText.content.substring(prefixStart, start);
    const suffixEnd = Math.min(end + 5, sectionText.content.length);
    const suffix = sectionText.content.substring(end, suffixEnd);

    return {
      start,
      end,
      suffix,
      prefix,
      sectionText: { connect: { id: sectionText.id } },
    };
  }

  private async _createAnnotation(
    id: string | null,
    type: AnnotationDef,
    value: any,
    textSelector: any | null,
  ) {
    if (!id) {
      return this.prisma.annotationNew.create({
        data: {
          type: { connect: { id: type.id } },
          value,
          textSelector: textSelector
            ? {
                create: textSelector,
              }
            : undefined,
        },
      });
    }

    return this.prisma.annotationNew.update({
      where: { id },
      data: {
        type: { connect: { id: type.id } },
        value,
        textSelector: textSelector
          ? {
              update: textSelector,
            }
          : {
              delete: true,
            },
      },
    });
  }

  public async createOrUpdate(
    id: string | null,
    data: AnnotationDto,
  ): Promise<AnnotationNewWithRelations> {
    const [{ type, value }, textSelector] = await Promise.all([
      this.validateData(data.type, data.value),
      this.getTextSelector(data),
    ]);

    const annotation = await this._createAnnotation(
      id,
      type,
      value,
      textSelector,
    );

    if (!data.relations)
      return this.annotationRepository.findOne(annotation.id);

    // create the relations, if it already exist skip it
    await this.prisma.annotationRelation.createMany({
      data: data.relations.map((id) => ({
        annotation_from_id: annotation.id,
        annotation_to_id: id,
      })),
    });

    return this.annotationRepository.findOne(annotation.id);
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

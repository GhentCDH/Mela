import { AnnotationDto, AnnotationLink } from '@mela/text/shared';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@mela/generated-prisma';
import {
  AnnotationDef,
  AnnotationNewWithRelations,
} from '@mela/generated-types';

import { AnnotationRepository } from '../annotation-repository.service';

@Injectable()
export class AnnotationTypeRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly annotationRepository: AnnotationRepository,
  ) {}

  async create(data: AnnotationDto) {
    return this.createOrUpdate(null, data);
  }

  async update(id: string, data: AnnotationDto) {
    return this.createOrUpdate(id, data);
  }

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
}

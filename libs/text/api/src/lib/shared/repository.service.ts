import { Author } from '@ghentcdh/mela/generated/types';

export abstract class AbstractRepository<Entity, CreateDto = Entity> {
  protected constructor(private readonly prismaModel: any) {}

  async list(): Promise<Author[]> {
    return this.prismaModel.findMany();
  }

  async create(dto: CreateDto): Promise<Entity> {
    return this.prismaModel.create({
      data: dto,
    });
  }

  async update(id: string, dto: CreateDto): Promise<Entity> {
    return this.prismaModel.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async delete(id: string): Promise<Entity> {
    return this.prismaModel.delete({
      where: {
        id,
      },
    });
  }
}

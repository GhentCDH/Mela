import { RequestDto } from '@ghentcdh/tools/form';

export abstract class AbstractRepository<Entity, CreateDto = Entity> {
  protected constructor(private readonly prismaModel: any) {}

  async list(request: RequestDto): Promise<Entity[]> {
    return this.prismaModel.findMany({
      take: request.pageSize,
      skip: request.offset,
    });
  }

  async count(): Promise<number> {
    return this.prismaModel.count();
  }

  async findOne(id: string): Promise<Entity> {
    return this.prismaModel.findUniqueOrThrow({ where: { id } });
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

import { RequestDto, buildFilter } from '@ghentcdh/tools/form';

export abstract class AbstractRepository<Entity, CreateDto = Entity> {
  protected constructor(private readonly prismaModel: any) {}

  async list(request: RequestDto): Promise<Entity[]> {
    return this.prismaModel.findMany({
      where: this.buildWhere(request.filter),
      include: this.include(),
      take: request.pageSize,
      skip: request.offset,
      orderBy: this.buildSort(request),
    });
  }

  async count(filter: string[]): Promise<number> {
    return this.prismaModel.count({ where: this.buildWhere(filter) });
  }

  private buildWhere(filters: string[]) {
    const filter = this.buildFilter(filters);

    if (!filter) return undefined;

    return { AND: filter };
  }

  include(): Record<string, true> {
    return {};
  }

  buildFilter(filters: string[]): any {
    return buildFilter(filters);
  }

  buildSort(request: Pick<RequestDto, 'sort' | 'sortDir'>): any {
    return { [request.sort]: request.sortDir };
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

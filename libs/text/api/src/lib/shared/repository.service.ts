import { RequestDto } from '@ghentcdh/json-forms/api';
import { buildFilter, buildSort } from '@ghentcdh/json-forms/core';

export abstract class AbstractRepository<Entity, CreateDto = Entity> {
  protected constructor(private readonly prismaModel: any) {}

  async list(request: RequestDto): Promise<Entity[]> {
    return this.prismaModel.findMany({
      where: this.buildWhere(request.filter),
      include: this.includeList(),
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

  /**
   * Fields to be included in creation
   * Used in list function
   * @protected
   */
  protected includeList(): Record<string, true> {
    return {};
  }

  /**
   * Fields to be included in creation
   * Used in list function
   * @protected
   */
  protected includeLDetail(): Record<string, true> {
    return {};
  }

  /**
   * Build filter
   * Used in list and count functions
   * @param filters
   * @protected
   */
  protected buildFilter(filters: string[]): any {
    return buildFilter(filters);
  }

  /**
   * Build sort
   * Used in list function
   * @param request
   * @protected
   */
  protected buildSort(request: Pick<RequestDto, 'sort' | 'sortDir'>): any {
    return buildSort(request.sort, request.sortDir);
  }

  /**
   * Connect related entities
   * Used in create and update functions
   * @param dto
   * @protected
   */
  protected async connect(dto: CreateDto): Promise<Partial<CreateDto>> {
    return {};
  }

  protected async connectCreate(dto: CreateDto): Promise<Partial<CreateDto>> {
    return this.connect(dto);
  }

  protected async connectUpdate(
    id: string,
    dto: CreateDto,
  ): Promise<Partial<CreateDto>> {
    return this.connect(dto);
  }

  async findOne(id: string): Promise<Entity> {
    return this.prismaModel.findUnique({
      where: { id },
      include: this.includeLDetail(),
    });
  }

  async create(dto: CreateDto): Promise<Entity> {
    const connect = await this.connectCreate(dto);
    return this.prismaModel.create({
      data: { ...dto, ...connect },
    });
  }

  async update(id: string, dto: CreateDto): Promise<Entity> {
    console.log(dto);
    const connect = await this.connectUpdate(id, dto);
    return this.prismaModel.update({
      where: {
        id,
      },
      data: { ...dto, ...connect },
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

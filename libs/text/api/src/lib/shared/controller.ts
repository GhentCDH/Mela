import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { RequestDto, ResponseData } from '@ghentcdh/tools/form';

import { AbstractRepository } from './repository.service';

export class AbstractController<Entity, CreateDto = Entity> {
  protected constructor(
    protected readonly repository: AbstractRepository<Entity, CreateDto>
  ) {}

  @Get()
  protected async list(
    @Query() params: RequestDto
  ): Promise<ResponseData<Entity>> {
    const [data, count] = await Promise.all([
      this.repository.list(params),
      this.repository.count(),
    ]);

    let totalPages = Math.ceil(count / params.pageSize);

    if (totalPages < 1) totalPages = 1;

    return {
      data,
      request: {
        count,
        page: params.page,
        pageSize: params.pageSize,
        totalPages,
      },
    };
  }

  @Get('/:id')
  protected async findOne(@Param('id') id: string): Promise<Entity> {
    return this.repository.findOne(id);
  }

  @Post()
  protected async create(@Body() dto: CreateDto): Promise<Entity> {
    return this.repository.create(dto);
  }

  @Patch('/:id')
  protected async update(
    @Param('id') id: string,
    @Body() dto: CreateDto
  ): Promise<Entity> {
    return this.repository.update(id, dto);
  }

  @Delete('/:id')
  protected delete(@Param('id') id: string): Promise<Entity> {
    return this.repository.delete(id);
  }
}

import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ResponseData, SchemaModel } from '@ghentcdh/tools/form';

import { AbstractRepository } from './repository.service';

export class AbstractController<Entity, CreateDto = Entity> {
  protected constructor(
    protected readonly repository: AbstractRepository<Entity, CreateDto>,
    private readonly schema: SchemaModel
  ) {}

  @Get('schema')
  schemaRequest() {
    return this.schema;
  }

  @Get()
  protected async list(): Promise<ResponseData<Entity>> {
    const data = await this.repository.list();

    return { data };
  }

  @Get('/:id')
  protected async findOne(@Param('id') id: string): Promise<Entity> {
    if (id === 'schema') return this.schemaRequest() as any;
    
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

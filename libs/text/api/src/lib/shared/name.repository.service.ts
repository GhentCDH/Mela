import { Injectable } from '@nestjs/common';

import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class AbstractNameRepository<
  Entity,
  CreateDto = Entity,
> extends AbstractRepository<Entity, CreateDto> {
  protected constructor(prismaModel: any) {
    super(prismaModel);
  }

  /**
   * Create or connect a record by id or name
   * @param id
   * @param name
   * @param data
   *        - additional metadata for the record
   */
  public async createOrConnect(
    id: string | undefined,
    name: string,
    data: Partial<Entity> = {},
  ) {
    const find = id
      ? await this.findOne(id)
      : await this.findOrCreate(name.trim(), data);

    return {
      connect: { id: find.id },
    };
  }

  /**
   * Find or create a record by name
   * @param name
   * @param data
   *        - additional metadata for the record
   */
  public async findOrCreate(name: string, data: Partial<Entity> = {}) {
    return this.prismaModel.upsert({
      where: { name },
      update: {},
      create: { name, ...data },
    });
  }
}

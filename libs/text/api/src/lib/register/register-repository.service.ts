import { Injectable } from '@nestjs/common';

import { PrismaService } from '@mela/generated-prisma';
import { Register } from '@mela/generated-types';

import { CreateRegisterDto } from './dto';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class RegisterRepository extends AbstractRepository<
  Register,
  CreateRegisterDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.register);
  }

  async findOrCreate({ id, name }: Partial<Register>) {
    if (id) {
      return this.findOne(id);
    }

    console.log('id', id);
    console.log('name', name);

    const findRegister = await this.prisma.register.findFirst({
      where: { name },
    });
    console.log('findRegister', findRegister);
    return findRegister ?? this.create({ name });
  }
}

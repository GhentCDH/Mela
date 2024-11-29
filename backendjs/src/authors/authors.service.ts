import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  create(createAuthorDto: CreateAuthorDto) {
    //return this.articlesService.create(createArticleDto);
  }

  findAll() {
    return this.prisma.author.findMany();
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({where: {id}});
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
   //return this.articlesService.update({where: { id }, data: updateAuthorDto});
  }

  remove(id: number) {
    //return this.articlesService.remove(+id);
  }
}

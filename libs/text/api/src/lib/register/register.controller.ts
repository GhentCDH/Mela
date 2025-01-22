import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

import { RegisterDto } from '@ghentcdh/mela/generated/dtos';
import { RequestDto } from '@ghentcdh/tools/form/api';

import { CreateRegisterDto, ListRegisterDto } from './dto';
import { RegisterRepository } from './register-repository.service';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('register')
export class RegisterController extends AbstractController<
  RegisterDto,
  CreateRegisterDto
> {
  constructor(repository: RegisterRepository) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListRegisterDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListRegisterDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: RegisterDto,
  })
  override async create(@Body() dto: CreateRegisterDto): Promise<RegisterDto> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: RegisterDto,
  })
  override async findOne(@Param('id') id: string): Promise<RegisterDto> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: RegisterDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateRegisterDto,
  ): Promise<RegisterDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: RegisterDto,
  })
  override async delete(@Param('id') id: string): Promise<RegisterDto> {
    return super.delete(id);
  }
}

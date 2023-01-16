import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Kantor } from '@prisma/client';
import { KantorService } from './kantor.service';

@Controller('kantor')
export class KantorController {
  constructor(private readonly kantorService: KantorService) {}

  @Get()
  async findAll(): Promise<Kantor[]> {
    return this.kantorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Kantor> {
    return this.kantorService.findOne(id);
  }

  @Post()
  async create(@Body() kantor: Kantor): Promise<Kantor> {
    return this.kantorService.create(kantor);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() kantor: Kantor,
  ): Promise<Kantor> {
    return this.kantorService.update(id, kantor);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Kantor> {
    return this.kantorService.delete(id);
  }
}

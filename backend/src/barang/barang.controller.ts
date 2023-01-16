import { BarangService } from './barang.service';
import { Barang } from '@prisma/client';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}

  @Get()
  async findAll(): Promise<Barang[]> {
    return this.barangService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Barang> {
    return this.barangService.findOne(id);
  }

  @Post()
  async create(@Body() barang: Barang): Promise<Barang> {
    return this.barangService.create(barang);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() barang: Barang,
  ): Promise<Barang> {
    return this.barangService.update(id, barang);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Barang> {
    return this.barangService.delete(id);
  }
}

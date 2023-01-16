import { PengirimanService } from './pengiriman.service';
import { Pengiriman } from '@prisma/client';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('pengiriman')
export class PengirimanController {
  constructor(private readonly pengirimanService: PengirimanService) {}

  @Get()
  async findAll(): Promise<Pengiriman[]> {
    return this.pengirimanService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pengiriman> {
    return this.pengirimanService.findOne(id);
  }

  @Post()
  async create(@Body() pengiriman: Pengiriman): Promise<Pengiriman> {
    return this.pengirimanService.create(pengiriman);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() pengiriman: Pengiriman,
  ): Promise<Pengiriman> {
    return this.pengirimanService.update(id, pengiriman);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Pengiriman> {
    return this.pengirimanService.delete(id);
  }

  @Get('hitung/:id')
  async calculate(@Param('id') id: string): Promise<any> {
    return this.pengirimanService.hitung(id);
  }

  @Get('kurir/:id')
  async byKururi(@Param('id') id: string): Promise<any> {
    return this.pengirimanService.getAllByKurir(id);
  }
}

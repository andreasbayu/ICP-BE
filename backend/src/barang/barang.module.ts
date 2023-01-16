import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BarangController } from './barang.controller';
import { BarangService } from './barang.service';

@Module({
  controllers: [BarangController],
  providers: [BarangService, PrismaService],
})
export class BarangModule {}

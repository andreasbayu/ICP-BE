import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { KantorController } from './kantor.controller';
import { KantorService } from './kantor.service';

@Module({
  controllers: [KantorController],
  providers: [KantorService, PrismaService],
})
export class KantorModule {}

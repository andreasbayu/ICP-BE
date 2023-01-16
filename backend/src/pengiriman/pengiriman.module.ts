import { Module } from '@nestjs/common';
import { PengirimanService } from './pengiriman.service';
import { PengirimanController } from './pengiriman.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PengirimanService, PrismaService],
  controllers: [PengirimanController],
})
export class PengirimanModule {}

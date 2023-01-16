import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BarangModule } from './barang/barang.module';
import { PengirimanModule } from './pengiriman/pengiriman.module';
import { KantorModule } from './kantor/kantor.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BarangModule,
    PengirimanModule,
    KantorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

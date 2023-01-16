import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  kode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  namaKantor: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alamat: string;

  @IsNotEmpty()
  @ApiProperty()
  koordinat: Kordinat;
}

class Kordinat {
  latitude: string;
  longitude: string;
}

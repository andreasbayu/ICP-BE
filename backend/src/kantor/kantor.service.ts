import { Injectable } from '@nestjs/common';
import { Kantor } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KantorService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Kantor[]> {
    return this.prisma.kantor.findMany();
  }

  async findOne(id: string): Promise<Kantor> {
    return this.prisma.kantor.findFirst({
      where: {
        id,
      },
    });
  }

  async create(kantor: Kantor): Promise<Kantor> {
    return this.prisma.kantor.create({
      data: kantor,
    });
  }

  async update(id: string, kantor: Kantor): Promise<Kantor> {
    return this.prisma.kantor.update({
      where: {
        id,
      },
      data: kantor,
    });
  }

  async delete(id: string): Promise<Kantor> {
    return this.prisma.kantor.delete({
      where: {
        id,
      },
    });
  }
}

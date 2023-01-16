import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  async findAll(params: {
    take?: number;
    orderBy?: Prisma.UserOrderByWithAggregationInput;
  }): Promise<User[]> {
    const { take, orderBy } = params;
    return this.prisma.user.findMany({
      orderBy,
      take,
    });
  }

  async findOne(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async update(paramns: { id: string; user: UpdateUserDto }) {
    const { id, user } = paramns;
    return this.prisma.user.update({
      data: user,
      where: {
        id: id,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

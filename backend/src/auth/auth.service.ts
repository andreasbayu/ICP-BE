import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Hash } from 'src/utils/bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const comparePassword = await Hash.compare(pass, user.password);
    if (!user) return null;
    if (user && comparePassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    const {} = user;
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const pass = await Hash.encrypt(user.password);
    const createUser = await this.usersService.create({
      username: user.username,
      password: pass,
      email: user.email,
      name: user.name,
    });

    if (createUser) {
      return {
        message: 'Berhasil',
      };
    }

    return {
      message: 'Gagal',
    };
  }
}

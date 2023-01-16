import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private name: string;

  getHello() {
    return {
      message: 'hello',
    };
  }

  getName(): string {
    return 'My Name is ';
  }

  setName(name: string): void {
    this.name = name;
  }
}

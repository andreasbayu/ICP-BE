import { Test, TestingModule } from '@nestjs/testing';
import { PengirimanController } from './pengiriman.controller';

describe('PengirimanController', () => {
  let controller: PengirimanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PengirimanController],
    }).compile();

    controller = module.get<PengirimanController>(PengirimanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

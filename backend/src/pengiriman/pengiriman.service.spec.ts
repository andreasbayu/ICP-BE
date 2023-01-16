import { Test, TestingModule } from '@nestjs/testing';
import { PengirimanService } from './pengiriman.service';

describe('PengirimanService', () => {
  let service: PengirimanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PengirimanService],
    }).compile();

    service = module.get<PengirimanService>(PengirimanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

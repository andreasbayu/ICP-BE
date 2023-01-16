import { Test, TestingModule } from '@nestjs/testing';
import { KantorService } from './kantor.service';

describe('KantorService', () => {
  let service: KantorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KantorService],
    }).compile();

    service = module.get<KantorService>(KantorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

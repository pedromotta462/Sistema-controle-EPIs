import { Test, TestingModule } from '@nestjs/testing';
import { RemovalService } from './removal.service';

describe('RemovalService', () => {
  let service: RemovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemovalService],
    }).compile();

    service = module.get<RemovalService>(RemovalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

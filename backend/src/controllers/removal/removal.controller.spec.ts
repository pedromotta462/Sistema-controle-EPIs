import { Test, TestingModule } from '@nestjs/testing';
import { RemovalController } from './removal.controller';

describe('RemovalController', () => {
  let controller: RemovalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemovalController],
    }).compile();

    controller = module.get<RemovalController>(RemovalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

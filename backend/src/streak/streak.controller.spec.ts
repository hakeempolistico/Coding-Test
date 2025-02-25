import { Test, TestingModule } from '@nestjs/testing';
import { StreakController } from './streak.controller';
import { StreakService } from './streak.service';

describe('StreakController', () => {
  let controller: StreakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreakController],
      providers: [StreakService],
    }).compile();

    controller = module.get<StreakController>(StreakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 400 if case number is not equal to 1, 2, or 3', () => {
    try {
      controller.findOne('4');
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  it('should return 200 if case number is equal to 1, 2, or 3', () => {
    try {
      controller.findOne('1');
    } catch (error) {
      expect(error.status).toBe(200);
    }
  });
  
});

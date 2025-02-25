import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return an object with correct properties', () => {
      const data = appController.get();

      expect(data).toHaveProperty('name', 'coding_test');
      expect(data).toHaveProperty('status', 'running');
      expect(typeof data.version).toBe('number');
    });
  });
});

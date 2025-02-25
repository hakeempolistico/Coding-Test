import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreakModule } from './streak/streak.module';

@Module({
  imports: [StreakModule],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

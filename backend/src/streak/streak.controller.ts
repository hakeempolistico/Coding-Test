import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { StreakService } from './streak.service';

@Controller('streaks')
export class StreakController {
  constructor(private readonly streakService: StreakService) {}

  @Get(':caseNumber')
  findOne(@Param('caseNumber') caseNumber: string) {
    try {
      return this.streakService.getStreaks(Number(caseNumber));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

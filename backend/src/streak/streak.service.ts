import { Injectable } from '@nestjs/common';
import { StreakDay, StreakResponse } from 'src/interfaces/streak.interface';

@Injectable()
export class StreakService {

  /**
   * Get the response streak
   * @param caseNumber - Case number of the data
   * @returns Formatted streak response
   */
  getStreaks(caseNumber: number): StreakResponse {
    return this.calculateStreak(caseNumber);
  }

  /**
   * Calculate the streak response data.
   * @param caseNumber - Case number of the data
   * @returns Formatted streak response
   */
  calculateStreak(caseNumber: number): StreakResponse {
    if (caseNumber === 1) {
      // 3 day recovery success
      // now().subtract(3, ‘days’) = 1 activity
      // now() = 3 activities

      const days = this.getWeekWindow([1, 0, 0, 3, 0, 0, 0], 3);

      return {
        activitiesToday: 3,
        total: this.getTotalStreak(days),
        days,
      };
    } else if (caseNumber === 2) {
      // 3 day recovery ongoing
      // now().subtract(4, ‘days’) = 1 activity
      // now().subtract(3, ‘days’) = 1 activity
      // now() = 1 activity

      const days = this.getWeekWindow([1, 1, 0, 0, 1, 0, 0], 4);

      return {
        activitiesToday: 1,
        total: this.getTotalStreak(days),
        days,
      };
    } else if (caseNumber === 3) {
      // 3 day recovery fail
      // now().subtract(4, ‘days’) = 1 activity
      // now().subtract(1, ‘days’) = 3 activities

      const days = this.getWeekWindow([1, 0, 0, 3, 0, 0, 0], 4);

      return {
        activitiesToday: this.getActivityToday(days),
        total: this.getTotalStreak(days),
        days,
      };

    } else {
      throw new Error('Case number not available');
    }
  }

  /**
   * Get the total streak based on the data of days
   * @param weekWindow - Week days data
   * @returns Total streak count
   */
  getTotalStreak(weekWindow: StreakDay[]): number {
    const todayString = new Date().toISOString().split('T')[0];
    let streak = 0;
    
    const sortedWindow = [...weekWindow].sort((a, b) => (a.date > b.date ? 1 : -1));
  
    for (const day of sortedWindow) {
      if (day.date > todayString) continue;

      if (day.date == todayString && day.state === 'INCOMPLETE') {
        continue;
      }

      if (day.state === 'INCOMPLETE') {
        streak = 0;
      } else {
        streak++;
      }
    }
  
    return streak;
  }

  /**
   * Get total activity for today
   * @param weekWindow - Week days data
   * @returns Total actitivites today.
   */
  getActivityToday(weekWindow: StreakDay[]): number {
    const todayString = new Date().toISOString().split('T')[0];
    const count = weekWindow.find((day: StreakDay) => {
      return day?.date == todayString;
    })?.activities;
    return count ?? 0;
  }

  /**
   * Get week data per day
   * @param activityPerDay - Activities per day.
   * @param order - Order of the date today.
   * @returns Returns week days data.
   */
  getWeekWindow(activityPerDay: number[], order: number): StreakDay[] {
    const today = new Date();
    const dates: StreakDay[] = [];

    for (let i = 0; i < activityPerDay.length; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + (i - order));

      const activities = activityPerDay[i];
      const dateString = date.toISOString().split('T')[0];
      const state = activities > 0 ? 'COMPLETED' : 'INCOMPLETE';

      dates.push({
        date: dateString,
        activities,
        state,
      });
    }

    return this.sortByDescending(this.updateStates(dates));
  }

  /**
   * Sort by descending.
   * @param weekWindow - Week days data
   * @returns Returns descending week data.
   */
  sortByDescending(weekWindow: StreakDay[]): StreakDay[] {
    return weekWindow.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  /**
   * Update the state of the days of the week.
   * @param weekWindow - Week days data
   * @returns Returns week window with updated state.
   */
  updateStates(weekWindow: StreakDay[]): StreakDay[] {
    const todayString = new Date().toISOString().split('T')[0];

    // Update AT_RISK and SAVED
    for (let i = 0; i < weekWindow.length; i++) {
      const day = weekWindow[i];
      const dayBefore = weekWindow[i - 1];
      const day2DaysBefore = weekWindow[i - 2];

      // Update AT_RISK
      if (day?.state === 'INCOMPLETE' && day?.date < todayString) {
        // Check if day before or 2 days before is completed

        if (dayBefore?.state === 'COMPLETED' || day2DaysBefore?.state === 'COMPLETED') {
          day.state = 'AT_RISK';
        }
      }

      // Update SAVED
      if (day?.state === 'INCOMPLETE' || day?.state === 'AT_RISK') {
        // Check if day before or 2 days before is completed
        const nextDay = weekWindow[i + 1];
        const next2Days = weekWindow[i + 2];

        if (nextDay?.activities > 1 || next2Days?.activities > 2) {
          day.state = 'SAVED';
        }
      }

      // Updated INCOMPLETE
      if (day?.state === 'COMPLETED' && day2DaysBefore) {
        // Check if required is 2
        if (day?.activities > 1) {
          if (day?.activities === 2 && day2DaysBefore.state === 'AT_RISK') {
            day.state = 'INCOMPLETE';
          }
        } else {
          day.state = 'INCOMPLETE';
        }
      }
    }

    return weekWindow;
  }
}

export type StreakState = 'COMPLETED' | 'INCOMPLETE' | 'AT_RISK' | 'SAVED';

export type StreakDay = {
  date: string;
  activities: number;
  state: StreakState;
  day?: string;
  today?: boolean;
}

export type StreakResponse = {
  activitiesToday: number;
  total: number;
  days: StreakDay[];
}
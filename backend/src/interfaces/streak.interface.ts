export type StreakState = 'COMPLETED' | 'INCOMPLETE' | 'AT_RISK' | 'SAVED';

export interface StreakDay {
    date: string;
    activities: number;
    state?: StreakState;
}

export interface StreakResponse {
    activitiesToday: number;
    total: number;
    days: StreakDay[];
}

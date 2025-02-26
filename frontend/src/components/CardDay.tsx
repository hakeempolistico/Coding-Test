import { StreakDay } from "@/types/streak.type";

export const CardDay = ({ day }: { day: StreakDay }) => {
    return (
        <div className={`day ${day.state.toLowerCase()} ${day?.today ? 'today' : ''}`}>
            <div className="circle">
            </div>
            {day.day}
        </div>
    );
}
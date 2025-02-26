import { StreakDay } from "@/types/streak.type";

export const fetchData = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:5000/streaks/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        // Map day
        if (result?.days) {
            result.days = result.days.map((day: StreakDay) => {
                const date = new Date(day.date);
                const today = new Date(); // Get today's date

                // Format both dates as YYYY-MM-DD to compare only the date, ignoring time
                const isToday =
                    date.toISOString().split("T")[0] === today.toISOString().split("T")[0];

                return {
                    ...day,
                    day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
                    today: isToday,
                };
            });

            result.days = result.days.reverse();

            return result;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
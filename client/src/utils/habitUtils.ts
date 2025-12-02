
import { useHabitStore } from "../store/HabitStore"
import type { IHabit } from "../types/IHabit"

// const {Habit}=useHabitStore

// date validation
const datesValidation = (startDate: Date | null, endDate: Date | null): { message: string | null } => {

    if (startDate && endDate) {
        if (startDate.getTime() >= endDate.getTime())
            return { message: "Start Date must be before End Date" }

        const today = new Date()
        today.setHours(0, 0, 0, 0);
        if (startDate.getTime() < today.getTime())
            return { message: "Start Date must be at least today" }
    }

    return { message: null };

}





export default { datesValidation }








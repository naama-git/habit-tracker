

// import { useHabitStore } from "../store/HabitStore"

import type { IHabit } from "../types/IHabit"


// date validation
export const datesValidation = (startDate: Date | null | undefined, endDate: Date | null | undefined): { message: string | null } => {

    if (startDate && endDate && startDate !== undefined && endDate !== undefined) {


        if (startDate.valueOf() >= endDate.valueOf())
            return { message: "Start Date must be before End Date" }

        const today = new Date()
        today.setHours(0, 0, 0, 0);
        if (startDate.valueOf() < today.valueOf())
            return { message: "Start Date must be at least today" }
    }

    return { message: null };

}

// frequency validation
export const frequencyValidation = (frequency: " daily" | "weekly" | "monthly", daysOfWeek?: number[], daysOfMonth?: number[]): { message: string | null } => {
    if (frequency === 'weekly') {
        if (daysOfMonth && daysOfMonth.length > 0) {
            return { message: `Days in month should not be provided when frequency is ${frequency || 'other'}` }
        }
        if (!Array.isArray(daysOfWeek) || daysOfWeek.length == 0) {
            return { message: 'You must select at least one day of the week when frequency is weekly' }
        }
        daysOfWeek.forEach((element: number) => {
            if (element < 0 || element > 6) {
                return { message: 'Days in week must be between 0 (Sunday) and 6 (Saturday)' };
            }
        });
    }
    else if (frequency === "monthly") {

        if (daysOfWeek && (daysOfWeek.length > 0)) {
            return { message: `Days in week should not be provided when frequency is ${frequency || 'other'}` }
        }
        if (!Array.isArray(daysOfMonth) || daysOfMonth.length == 0) {
            return { message: 'You must select at least one day of the month when frequency is monthly' }
        }
        daysOfMonth.forEach((element: number) => {
            if (element < 0 || element > 6) {
                return { message: 'Days in month must be between 1 and 31' };
            }
        });

    }
    return { message: null }
}

export const frequencyValidationForUpdate = (currentHabit: IHabit, frequency: " daily" | "weekly" | "monthly", daysOfWeek?: number[], daysOfMonth?: number[]): { message: string | null } => {

    if (currentHabit.frequency !== frequency && frequency) {
        return frequencyValidation(frequency, daysOfWeek, daysOfMonth)
    }
    return { message: null }
}
// filter updated object from undefined fields and idential values
// const filterUpdatedObject = ( updates: Partial<IHabit>): Partial<IHabit> => {
//     const { habit } = useHabitStore()
//     const filteredUpdates: Partial<IHabit> = {}
//     for (const key in updates) {
//         const value = updates[key as keyof IHabit]
//         if (value !== undefined && value !== null && value !== habit[key as keyof IHabit]) {
//             filteredUpdates[key as keyof IHabit] = value
//         }
//     }
//     return filteredUpdates
// }





// export default { datesValidation }








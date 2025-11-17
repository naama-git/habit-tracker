export interface IHabit {
    _id?:string
    habitName: string;
    description?: string;
    tag?: string[];
    frequency: number | null;
    startDate: Date | string;
    endDate?: Date | string | null;
    time: string; // Format HH:MM

}

// export interface IHabitWithId extends IHabit {
//     _id: string;
// }
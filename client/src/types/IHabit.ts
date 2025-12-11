export interface IHabit {
    _id?:string
    habitName: string;
    description?: string;
    tag?: string[];
    frequency:' daily' | 'weekly' | 'monthly';
    daysInMonth?: number[] | null;
    daysInWeek?: number[] | null;
    startDate: Date | string;
    endDate?: Date | string | null;
    time: string; // Format HH:MM

}


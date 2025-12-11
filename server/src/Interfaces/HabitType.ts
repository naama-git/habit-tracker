import { Types, } from 'mongoose'


export interface IHabit {
    _id: Types.ObjectId | string,
    habitName: string,
    description?: string | undefined,
    tag?: string[] | undefined,
    frequency: 'daily' | 'weekly' | 'monthly',
    daysInMonth?: number[] | undefined,
    daysInWeek?: number[] | undefined,
    time: string,
    startDate: Date
    endDate?: Date | undefined
    userId?: Types.ObjectId | string
}
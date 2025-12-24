import dayjs from 'dayjs';

export interface ITrack {

    habitId: string | undefined
    logDate: Date | dayjs.Dayjs | undefined
    done: boolean | undefined


}
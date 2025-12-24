import { ErrorApp } from "../Interfaces/ErrorApp"
import HabitLog from '../models/HabitLog'
import { Request, Response } from "express";



//get habit logs
export const getHabitTrackers = async (req: Request, res: Response) => {
    const { _id } = req.params
    const logs = await HabitLog.find({ habitId: _id }).lean()
    if (!logs || logs === undefined) {
        throw new ErrorApp(404, "Couldn't find valid habit trackers", "updateHabitStatus", req.method as any, "no havit trackers was found", req.originalUrl)
    }
    return res.status(200).json({ data: logs })
}


//update habit status
export const upsertHabitStatus = async (req: Request, res: Response) => {
    const { _id } = req.params;
    const { done, logDate } = req.body;

    try {
        const tracker = await HabitLog.findOneAndUpdate(
            { logDate },
            { done, logDate, habitId: _id },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        ).exec();

        return res.status(200).json(tracker);

    } catch (error) {
        throw new ErrorApp(500, "Internal Server Error", "upsertHabitStatus", req.method as any, "Failed to upsert habit status", req.originalUrl);
    }
}



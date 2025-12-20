import { ErrorApp } from "../Interfaces/ErrorApp"
import HabitLog from '../models/HabitLog'
import { Request, Response } from "express";


//mark habit as done
export const trackHabit = async (req: Request, res: Response) => {
    const { _id } = req.params
    const { logDate, done } = req.body
    const isExist = await HabitLog.findOne({ logDate })
    if (isExist) {
        return res.status(201).json({ habitId: isExist.habitId, logDate: isExist.logDate, done: isExist.done })
    }
    const habitLog = await HabitLog.create({ habitId: _id, logDate, done })
    if (!habitLog) {
        throw new ErrorApp(500, "Internal server error", "habitDone", req.method as any, "Failed to track habit", req.originalUrl)
    }
    return res.status(201).json({ habitId: habitLog.habitId, logDate: habitLog.logDate, done: habitLog.done })
}

//get habit logs
export const getHabitTrackers = async (req: Request, res: Response) => {
    const { _id } = req.params
    const logs = await HabitLog.find({ habitId: _id }).lean()
    if (!logs || logs === undefined) {
        throw new ErrorApp(404, "Couldn't find valid habit trackers", "updateHabitStatus", req.method as any, "no havit trackers was found", req.originalUrl)
    }
    return res.status(200).json({ habitTrackers: logs })
}


//update habit status
export const updateHabitStatus = async (req: Request, res: Response) => {
    const { _id } = req.params
    const { done } = req.body
    const tracker = await HabitLog.findOne({ habitId: _id }).exec()

    if (!tracker) {
        throw new ErrorApp(404, "Couldn't find valid habit trackers", "updateHabitStatus", req.method as any, "no havit tracker was found", req.originalUrl)
    }
    tracker.done = done
    tracker.logDate = tracker.logDate
    tracker.habitId = tracker._id
    const updatedHabitLog = await tracker.save()
    if (!updatedHabitLog) {
        throw new ErrorApp(500, "Internal Server Error", "updateHabitStatus", req.method as any, "could't update habit", req.originalUrl)
    }

    return res.status(200).json(updatedHabitLog)
}




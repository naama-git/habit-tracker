

import { Request, Response } from "express";
import Habit from '../models/Habit'
import HabitLog from '../models/HabitLog'
import { log } from "node:console";



//get all habits
const getHabits = async (req: Request, res: Response) => {

    const user = req.user
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    let habits = []
    habits = await Habit.find({ userId: user._id }).lean()

    // if (!habits || habits.length === 0) {
    //     return res.status(404).json({ message: "No habits found", habits: [] })
    // }
    return res.status(200).json(habits)
}

//get habit by id
const getHabitById = async (req: Request, res: Response) => {
    const { id } = req.params
    const habit = await Habit.findById(id).lean()
    if (!habit) {
        return res.status(404).json({ message: "Habit not found" })
    }
    res.json(habit)
}

//create a new habit
const createHabit = async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const { habitName, description, tag, frequency, daysInMonth, daysInWeek, startDate, endDate, time } = req.body

    let sendStartDate: Date = startDate;
    if (sendStartDate === undefined) {
        sendStartDate = new Date();
    }
    if (endDate !== undefined && new Date(endDate) < new Date(sendStartDate)) {
        return res.status(400).json({ message: "End date must be after start date" })
    }


    let habit = {}
    if (frequency === "monthly") {
        habit = await Habit.create({ habitName, description, tag, frequency: frequency.toLowerCase(), daysInMonth, startDate: sendStartDate, endDate, time, userId: user._id })
    }
    else if (frequency === "weekly") {
        habit = await Habit.create({ habitName, description, tag, frequency: frequency.toLowerCase(), daysInWeek, startDate: sendStartDate, endDate, time, userId: user._id })

    }
    else {
        habit = await Habit.create({ habitName, description, tag, frequency: frequency.toLowerCase(), startDate: sendStartDate, endDate, time, userId: user._id })
    }
    if (!habit) {
        return res.status(500).json({ message: "Failed to create habit" })
    }
    return res.status(201).json(habit)
}

//delete a habit
const deleteHabit = async (req: Request, res: Response) => {
    const { id } = req.params
    const habit = await Habit.findByIdAndDelete(id)
    if (!habit) {
        return res.status(404).json({ message: "Habit not found" })
    }

    const deletedHabit = await habit.deleteOne()

    if (!deletedHabit) {
        return res.status(500).json({ message: "Failed to delete habit" })
    }

    return res.status(204).json({ message: "Habit deleted successfully" })
}

//update a habit
const updateHabit = async (req: Request, res: Response) => {
    const { id } = req.params
    const { habitName, description, tag, frequency, startDate, endDate, time } = req.body

    const habit = await Habit.findById(id).exec()
    if (!habit) {
        return res.status(404).json({ message: "Habit not found" })
    }

    //update fields
    habit.habitName = habitName
    habit.description = description
    habit.tag = tag
    habit.frequency = frequency

    //update startDate only if it's provided and valid
    if (startDate !== undefined && startDate) {
        if (startDate > new Date()) habit.startDate = startDate
    }
    if (endDate !== undefined) habit.endDate = endDate

    habit.time = time
    const updatedHabit = await habit.save()
    if (!updateHabit) {
        return res.status(500).json({ message: "Failed to update habit" })
    }
    return res.status(200).json(updatedHabit)
}

//update a habit partially
// This allows updating only specific fields without requiring all fields to be present
const updatePartialHabit = async (req: Request, res: Response) => {

    const { _id } = req.params
    const updates = req.body;

    // Validate that the request body is not empty or contains only undefined values 
    const filterObject = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined && value !== null)
    );

    if (Object.keys(filterObject).length === 0) {
        return res.status(400).send({ message: "Body cannot be empty or contain only undefined values." });
    }

    //טעון בירור
    const habit = await Habit.findById(_id).exec()
    if (!habit) {
        return res.status(404).json({ message: "Habit not found" })
    }

    Object.keys(updates).forEach((key)=>{
        habit[key]=updates[key]//fix
    })

    const updatedHabit = await habit.save()
    if (!updatedHabit) {
        return res.status(500).json({ message: "Failed to update habit" })
    }
    return res.status(200).json(updatedHabit)

}


//mark habit as done
const habitDone = async (req: Request, res: Response) => {
    // const { id } = req.params
    const { habitId, logDate, done } = req.body
    if (!habitId || !logDate) {
        return res.status(400).json({ message: "HabitId and logDate are required" })
    }
    const habitLog = await HabitLog.create({ habitId, logDate, done })
    if (!habitLog) {
        return res.status(500).json({ message: "Failed to log habit" })
    }
    return res.status(201).json(habitLog)
}
export default { getHabits, getHabitById, createHabit, deleteHabit, updateHabit, habitDone, updatePartialHabit }


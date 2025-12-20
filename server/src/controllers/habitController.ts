

import { Request, Response } from "express";
import Habit from '../models/Habit'

import { IHabit } from '../Interfaces/HabitType'
import { IUser } from "../Interfaces/UserType";
import { ErrorApp } from "../Interfaces/ErrorApp";


//get all habits
const getHabits = async (req: Request, res: Response) => {

    const user: IUser | undefined = req.user
    if (!user || user === undefined) {
        throw new ErrorApp(401, "Unauthorized", "getHabits", req.method as any, "req.user is empty", req.originalUrl)
    }

    let habits: IHabit[] = []
    habits = await Habit.find({ userId: user._id }).lean() as unknown as IHabit[];
    return res.status(200).json(habits)
}

//get habit by id
const getHabitById = async (req: Request, res: Response) => {
    const { id } = req.params
    const habit = await Habit.findById(id).lean()
    if (!habit) {
        throw new ErrorApp(404, "Habit not found", "getHabitById", req.method as any, "Habit Id was not found", req.originalUrl)
    }
    res.status(200).json(habit)
}

//create a new habit
const createHabit = async (req: Request, res: Response) => {
    const user: IUser | undefined = req.user

    if (!user || user === undefined) {
        throw new ErrorApp(401, "Unauthorized", "createHabits", req.method as any, "req.user is empty", req.originalUrl)
    }
    const { habitName, description, tag, frequency, daysInMonth, daysInWeek, startDate, endDate, time } = req.body

    let sendStartDate: Date = startDate;
    if (sendStartDate === undefined) {
        sendStartDate = new Date();
    }
    if (endDate !== undefined && new Date(endDate) < new Date(sendStartDate)) {
        throw new ErrorApp(400, "End date must be greater than start date", "getHabits", req.method as any, "End date must be greater than start date", req.originalUrl)
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
        throw new ErrorApp(500, "Internal server error", "createHabit", req.method as any, "Failed to create habit", req.originalUrl)

    }
    return res.status(201).json(habit)
}

//delete a habit
const deleteHabit = async (req: Request, res: Response) => {
    const { id } = req.params
    const habit = await Habit.findByIdAndDelete(id)
    if (!habit) {
        throw new ErrorApp(404, "Habit not found", "getHabitById", req.method as any, "Habit Id was not found", req.originalUrl)
    }

    const deletedHabit = await habit.deleteOne()

    if (!deletedHabit) {
        throw new ErrorApp(500, "Internal server error", "deleteHabit", req.method as any, "Failed to delete habit", req.originalUrl)
    }

    return res.status(204).json({ message: "Habit deleted successfully" })
}

//update a habit
const updateHabit = async (req: Request, res: Response) => {
    const { id } = req.params
    const { habitName, description, tag, frequency, startDate, endDate, time } = req.body

    const habit = await Habit.findById(id).exec()
    if (!habit) {
        throw new ErrorApp(404, "Habit not found", "getHabitById", req.method as any, "Habit Id was not found", req.originalUrl)


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
        throw new ErrorApp(500, "Internal server error", "updateHabit", req.method as any, "Failed to update habit", req.originalUrl)

    }
    return res.status(200).json(updatedHabit)
}

//update a habit partially

const updatePartialHabit = async (req: Request, res: Response) => {

    const { _id } = req.params
    const updates = req.body;

    // Validate that the request body is not empty or contains only undefined values 
    const filterObject = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined && value !== null)
    );

    if (Object.keys(filterObject).length === 0) {
        throw new ErrorApp(400, "Body cannot be empty or contain only undefined values", "updatePartialHabit", req.method as any, "Body cannot be empty or contain only undefined values", req.originalUrl)
    }

    const habit = await Habit.findById(_id).exec()
    if (!habit) {
        throw new ErrorApp(404, "Habit not found", "getHabitById", req.method as any, "Habit Id was not found", req.originalUrl)
    }

    //update fields
    (Object.keys(updates) as Array<keyof IHabit>).forEach((key) => {
        habit[key] = (updates as any)[key];
    })

    const updatedHabit = await habit.save()
    if (!updatedHabit) {
       throw new ErrorApp(500, "Internal server error", "updatePartialHabit", req.method as any, "Failed to patch habit", req.originalUrl)
    }
    return res.status(200).json(updatedHabit)

}



export default { getHabits, getHabitById, createHabit, deleteHabit, updateHabit, updatePartialHabit }


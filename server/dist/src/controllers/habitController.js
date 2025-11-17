"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Habit_1 = __importDefault(require("../models/Habit"));
const HabitLog_1 = __importDefault(require("../models/HabitLog"));
//get all habits
const getHabits = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const habits = await Habit_1.default.find({ userId: user._id }).lean();
    if (!habits || habits.length === 0) {
        return res.status(404).json({ message: "No habits found" });
    }
    return res.status(200).json(habits);
};
//get habit by id
const getHabitById = async (req, res) => {
    const { id } = req.params;
    const habit = await Habit_1.default.findById(id).lean();
    if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
    }
    res.json(habit);
};
//create a new habit
const createHabit = async (req, res) => {
    const { habitName, description, tag, frequency, startDate, endDate, time, userId } = req.body;
    // if (!habitName || !frequency || !userId || !time) {
    //     return res.status(400).json({ message: "habit Name, frequency, time or userId are required" })
    // }
    let sendStartDate = startDate;
    if (sendStartDate === undefined) {
        sendStartDate = new Date();
    }
    if (endDate !== undefined && new Date(endDate) < new Date(sendStartDate)) {
        return res.status(400).json({ message: "End date must be after start date" });
    }
    const habit = await Habit_1.default.create({ habitName, description, tag, frequency, startDate: sendStartDate, endDate, time, userId });
    return res.status(201).json(habit);
};
//delete a habit
const deleteHabit = async (req, res) => {
    const { id } = req.params;
    const habit = await Habit_1.default.findByIdAndDelete(id);
    if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
    }
    const deletedHabit = await habit.deleteOne();
    if (!deletedHabit) {
        return res.status(500).json({ message: "Failed to delete habit" });
    }
    return res.status(204).json({ message: "Habit deleted successfully" });
};
//update a habit
const updateHabit = async (req, res) => {
    const { id } = req.params;
    const { habitName, description, tag, frequency, startDate, endDate, time } = req.body;
    // console.log(`${habitName}, ${description}, ${tag}, ${frequency}, ${startDate}, ${endDate}, ${time}`);
    // if (!habitName || !description || !tag || !frequency || !time) {
    //     return res.status(400).json({ message: "Name, description, tag, frequency and time are required" })
    // }
    const habit = await Habit_1.default.findById(id).exec();
    if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
    }
    //update fields
    habit.habitName = habitName;
    habit.description = description;
    habit.tag = tag;
    habit.frequency = frequency;
    //update startDate only if it's provided and valid
    if (startDate !== undefined && startDate) {
        if (startDate > new Date())
            habit.startDate = startDate;
    }
    if (endDate !== undefined)
        habit.endDate = endDate;
    habit.time = time;
    const updatedHabit = await habit.save();
    if (!updateHabit) {
        return res.status(500).json({ message: "Failed to update habit" });
    }
    return res.status(200).json(updatedHabit);
};
//mark habit as done
const habitDone = async (req, res) => {
    // const { id } = req.params
    const { habitId, logDate, done } = req.body;
    if (!habitId || !logDate) {
        return res.status(400).json({ message: "HabitId and logDate are required" });
    }
    const habitLog = await HabitLog_1.default.create({ habitId, logDate, done });
    if (!habitLog) {
        return res.status(500).json({ message: "Failed to log habit" });
    }
    return res.status(201).json(habitLog);
};
exports.default = { getHabits, getHabitById, createHabit, deleteHabit, updateHabit, habitDone };
//# sourceMappingURL=habitController.js.map
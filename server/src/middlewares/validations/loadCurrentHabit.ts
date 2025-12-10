import { Request, Response, NextFunction } from 'express'
import Habit from '../../models/Habit';


export const loadHabit = (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const currentHabit = Habit.findById(_id).exec();
    if (!currentHabit) {
        return res.status(404).json({ message: "Habit not found" });
    }
    req.currentHabit = currentHabit;
    next();

}
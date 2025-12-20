import { Request, Response, NextFunction } from 'express'
import Habit from '../../models/Habit';
import { ErrorApp } from '../../Interfaces/ErrorApp';


 const loadHabit = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const currentHabit = await Habit.findById(_id).exec();
    if (!currentHabit) {
        throw new ErrorApp (404, "Page not found", "loadHabit", req.method as any ,"Habit not found")
    }
    // console.log(currentHabit);
    
    req.currentHabit = currentHabit;
    next();

}
export default loadHabit;
import { Request, Response } from "express";
declare const _default: {
    getHabits: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getHabitById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createHabit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteHabit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateHabit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    habitDone: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=habitController.d.ts.map
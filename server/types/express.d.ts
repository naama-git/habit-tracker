import user from '../src/models/User'

declare global {
  namespace Express {
    interface Request {
      // user?: import ('../src/models/User').User; 
      user?:import ('../src/Interfaces/UserType').IUser
      currentHabit: import ('../src/models/Habit').Habit;
    }
  }
}
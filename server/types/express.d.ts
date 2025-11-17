import user from '../src/models/User'

declare global {
  namespace Express {
    interface Request {
      user?: import ('../src/models/User').User; 
    }
  }
}
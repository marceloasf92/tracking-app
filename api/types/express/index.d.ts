import { User } from '../../src/interfaces/user.interface'; // Adjust the import according to your project structure

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

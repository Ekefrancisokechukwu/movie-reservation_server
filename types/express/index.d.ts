import { IUser } from "../../src/type";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

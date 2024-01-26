import { User } from "./User";

export interface UserRepository {
  getAll(): Promise<User[] | null>;
  createUser(
    name: string,
    email: string,
  ): Promise<User | null>;
}

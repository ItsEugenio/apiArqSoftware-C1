import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class GetAllUserUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async run(): Promise<User[] | null> {
    try {
      const user = await this.userRepository.getAll();
      return user;
    } catch (error) {
      return null;
    }
  }
}

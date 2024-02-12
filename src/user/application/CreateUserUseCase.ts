import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class CreateUserUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async run(
    id: number,
    name: string,
    password: string,
    email: string,
  ): Promise<User | null> {
    try {
      const user = await this.userRepository.createUser(
        id,
        name,
        password,
        email
      );
      return user;
    } catch (error) {
      return null;
    }
  }
}

import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class GetByIdUserUseCase{
    constructor(readonly userRepository: UserRepository) {}
    async run(id:number): Promise<User[] | null> {
        try {
            const user = await this.userRepository.getById(id);
            return user;
        } catch (error) {
            return null
        }
    }
}
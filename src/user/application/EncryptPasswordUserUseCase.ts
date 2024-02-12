import { User } from "../domain/User";
import { UserEncryptRepository } from "../domain/UserEncryptRepository";

export class EncryptPasswordUserUserCase{
    constructor(readonly UserEncryptRepository: UserEncryptRepository) {}

    async run(password:string): Promise<User[] | null> {
        try {
            const passwordUse = await this.UserEncryptRepository.encrypt(password)
            return passwordUse;
        } catch (error) {
            
        }
    }
}
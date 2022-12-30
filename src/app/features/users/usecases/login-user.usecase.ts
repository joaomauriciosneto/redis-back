import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

export class LoginUserUseCase {
  constructor(
    private repository: UserRepository) {};

  public async execute(email: string, password: string) {

    const result = await this.repository.login(email, password);
    console.log(result);

    return result;
  }

}

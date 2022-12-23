import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

export class LoginUserUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository) {};

  public async execute(email: string, password: string) {
    // const cachedUser = await this.cacheRepository.get('users');

    // if(cachedUser) {
    //   return cachedUser;
    // }

    const result = await this.repository.login(email, password);
    console.log(result)
    return result;
  }

}

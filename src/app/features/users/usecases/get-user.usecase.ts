import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

// interface ListUserDTO {
//   id: string;
// }

export class GetUserUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository) {}

  public async execute(id: string) {
    const cachedUser = await this.cacheRepository.get(`users-${id}`);

    if(cachedUser) {
      return cachedUser;
    }

    const user = await this.repository.get(id);

    if(!user) {
      return null;
    }

    const userJson = user.toJson();

    await this.cacheRepository.set(`users-${id}`, userJson);

    return userJson;
  }
}

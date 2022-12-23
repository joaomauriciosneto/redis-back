import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

interface ListUserDTO {
  id: string;
}

export class GetUserUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository) {}

  public async execute(data: ListUserDTO) {
    const cachedUser = await this.cacheRepository.get(data.id);

    if(cachedUser) {
      return null;
    }

    const user = await this.repository.get(data.id);

    if(!user) {
      return null;
    }

    const userJson = user.toJson();

    await this.cacheRepository.set(data.id, userJson);

    return userJson;
  }
}

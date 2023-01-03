import { UserModel } from "../../../models/user.models";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

interface CreateUserDTO {
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository) {}

  public async execute(data: CreateUserDTO) {
    const user = new UserModel(
      data.email,
      data.password
    )

    const userExists = await this.repository.findByEmail(data.email)

    if(userExists) {
      throw new Error('Email already used!')
    }

    const result = await this.repository.create(user);

    await this.cacheRepository.delete('users');

    return result.toJson();

  }
}

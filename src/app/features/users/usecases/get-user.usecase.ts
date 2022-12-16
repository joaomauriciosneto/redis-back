import { UserRepository } from "../repositories/user.repository";

interface ListUserDTO {
  id: string;
}

export class GetUserUseCase {
  constructor(private repository: UserRepository) {}

  public async execute(data: ListUserDTO) {
    const result = await this.repository.get(data.id);

    return result;
  }
}
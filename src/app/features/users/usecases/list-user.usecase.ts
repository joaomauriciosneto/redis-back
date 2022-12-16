import { UserRepository } from "../repositories/user.repository";

export class ListUsersUseCase {
  constructor(private repository: UserRepository) {}

  public async execute() {
    const result = await this.repository.list();

    return result.map(item => item.toJson());
  }
}

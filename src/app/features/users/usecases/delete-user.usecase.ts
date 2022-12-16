import { UserRepository } from "../repositories/user.repository";

interface DeleteUserDTO {
  id: string;
}

export class DeleteUserUseCase {
  constructor(private _repository: UserRepository) {}

  public async execute(data: DeleteUserDTO) {
    const result = await this._repository.delete(data.id)

    return result;
  }
}
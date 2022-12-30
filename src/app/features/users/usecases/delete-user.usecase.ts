import { UserRepository } from "../repositories/user.repository";

// interface DeleteUserDTO {
//   idUser: string;
// }

export class DeleteUserUseCase {
  constructor(
    private _repository: UserRepository,) {}

  public async execute(id: string) {
    const result = await this._repository.delete(id)

    return result;
  }
}

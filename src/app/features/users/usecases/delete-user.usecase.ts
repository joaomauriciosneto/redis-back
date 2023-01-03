import { SharedUserRepository } from "../../../shared/repositories/SharedUserRepository";
import { NoteRepository } from "../../notes/repositories/note.repository";
import { UserRepository } from "../repositories/user.repository";

export class DeleteUserUseCase {
  constructor(
    private _repository: UserRepository,) {}

  public async execute(id: string) {
    const userRepository = new SharedUserRepository();
    const user = await userRepository.getUserById(id)

    if(!user) {
      throw new Error('User not found!')
    }

    // NÃO PERMITIR DELETAR USER COM RECADOS ******
    const userVerify = new NoteRepository()
    const resultVerify = await userVerify.listNotesById(id)

    if(resultVerify.length > 0 && user.id == id) {
      throw new Error('It is not possible to delete the user, because the and even has note!')
    }
    // *********************************************

    await this._repository.delete(user.id)

  }
}

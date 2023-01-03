import { SharedUserRepository } from "../../../shared/repositories/SharedUserRepository";
import { UserRepository } from "../../users/repositories/user.repository";
import { NoteRepository } from "../repositories/note.repository";

export class ListNoteUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private noteRepository: NoteRepository,
    private userSharedRepository: SharedUserRepository
  ) {}

  public async execute(idUser: string) {
    const user = await this.userSharedRepository.getUserById(idUser);

    if(!user) {
      return null;
    }

    const notes = await this.noteRepository.listNotesById(idUser)

    if(!notes) {
      return null
    }

    return notes.map(item => item.getNotes());
  }
}

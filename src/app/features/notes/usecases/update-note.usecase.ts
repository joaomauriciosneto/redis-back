import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { SharedUserRepository } from "../../../shared/repositories/SharedUserRepository";
import { NoteRepository } from "../repositories/note.repository";

interface UpdateNoteDTO {
  title: string;
  description: string;
  saveNote: boolean;
  idUser: string;
  idNote: string;
}

export class UpdateNoteUsecase {
  constructor(
    private noteRepository: NoteRepository,
    private cacheRepository: CacheRepository,
    private userRepository: SharedUserRepository
  ) {}

  public async execute(data: UpdateNoteDTO) {
    const user = await this.userRepository.getUserById(data.idUser)

    if(!user) {
      throw new Error('User not found!')
    }

    const note = await this.noteRepository.listNotesById(data.idUser)

    if(!note) {
      throw new Error('Not found!')
    }

  }

}

import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { SharedUserRepository } from "../../../shared/repositories/SharedUserRepository";
import { NoteRepository } from "../repositories/note.repository";

interface UpdateNoteDTO {
  title: string;
  description: string;
  saveNote: boolean;
  idUser: string;
  idNotes: string;
}

export class UpdateNoteUsecase {
  constructor(
    private noteRepository: NoteRepository,
    private cacheRepository: CacheRepository,
    private userRepository: SharedUserRepository
  ) {}

  public async execute(data: UpdateNoteDTO) {
    const note = await this.noteRepository.get(data.idNotes)

    if(!note) {
      return null;
    }

    if(data.idUser != note.user.id) {
      throw new Error('Only the owner of the message can change!')
    }

    note.title = data.title;
    note.description = data.description;
    note.saveNote = data.saveNote;

    const result = await this.noteRepository.editUser(data);

    await this.cacheRepository.delete(`note-${note.idNotes}`);
    await this.cacheRepository.delete(`note-${note.user.id}`);

    return result;
  }

}

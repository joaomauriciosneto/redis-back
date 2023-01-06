import { SharedUserRepository } from "../../../shared/repositories/SharedUserRepository";
import { NoteRepository } from "../repositories/note.repository";


export class DeleteNoteByUser {
  constructor(
    private noteRepository: NoteRepository,
  ) {}

  public async execute(idUser: string, idNotes: string) {

    const noteRepository = await this.noteRepository.get(idNotes)

    if(!noteRepository) {
      throw new Error('Note not found!')
      // return null
    }

    if(noteRepository.user.id != idUser) {
      throw new Error('Only the owner of the note has this permission!')
    }

    // AQUI TINHA UM RETURN
    await this.noteRepository.delete(idNotes)

  }
}

import { NoteRepository } from "../repositories/note.repository";


export class DeleteNoteByUser {
  constructor(
    private noteRepository: NoteRepository
  ) {}

  public async execute(idUser: string, idNotes: string) {

    const noteRepository = await this.noteRepository.get(idNotes)

    if(!noteRepository) {
      return null
    }

    if(noteRepository.user.id != idUser) {
      throw new Error('Only the owner of the note has this permission!')
    }

    return await this.noteRepository.delete(idNotes)

  }
}

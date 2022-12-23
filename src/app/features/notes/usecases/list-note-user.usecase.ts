import { NoteRepository } from "../repositories/note.repository";

export class ListNoteUserUseCase {
  constructor(
    private repository: NoteRepository
  ) {}

  public async execute(id: string) {
    const notes = await this.repository.find(id)
    console.log(notes);

    if(!notes) {
      return null
    }

    return notes.map(item => item.getNotes());
  }
}

import { NotesModel } from "../../../models/note.models";
import { UserModel } from "../../../models/user.models";
import { UserRepository } from "../../users/repositories/user.repository";
import { NoteRepository } from "../repositories/note.repository";

interface CreateNoteDTO {
  title: string;
  description: string;
  saveNote: boolean;
  idUser: string;
}

export class CreateNoteUseCase {
  constructor(
    private repostiroy: UserRepository,
    private noteRepository: NoteRepository) {}

  public async execute(data: CreateNoteDTO) {
    const user = await this.repostiroy.get(data.idUser);

    if(!user) {
      throw new Error('User not found!');
      // return null;
    }

    const createNote = new NotesModel(
      data.title,
      data.description,
      data.saveNote,
      user
    )
    const newNote = await this.noteRepository.create(createNote);

    return newNote.getNotes();
  }
}

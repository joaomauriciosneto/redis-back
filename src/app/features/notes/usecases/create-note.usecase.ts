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
    //console.log(user);

    if(!user) {
      return null;
    }

    const createNote = new NotesModel(
      data.title,
      data.description,
      data.saveNote,
      user
    )
    console.log(createNote)
    const newNote = await this.noteRepository.create(createNote);
    //console.log(newNote);

    return newNote.getNotes();
  }
}

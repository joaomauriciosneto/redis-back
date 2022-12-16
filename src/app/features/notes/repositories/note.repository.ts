import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { NotesModel } from "../../../models/note.models";
import { UserModel } from "../../../models/user.models";
import { NoteEntity } from "../../../shared/entities/note.entity";

export class NoteRepository {
  private _repository = DatabaseConnection.connection.getRepository(NoteEntity);

  public async list(){
    return await this._repository.find({
      relations: {
        user: true
      }
    })
  }

  public async get(id: string) {
    return await this._repository.findOneBy({id})
  }

  // TEM QUE PEGAR O ID DO USUÁRIO???
  public async create(note: NotesModel) {
    const newNote = this._repository.create({
      user: note.usuario,
      title: note.description,
      description: note.description
    })

    return await this._repository.save(newNote);
  }

}

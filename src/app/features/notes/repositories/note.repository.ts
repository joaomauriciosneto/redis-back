import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { NotesModel } from "../../../models/note.models";
import { UserModel } from "../../../models/user.models";
import { NoteEntity } from "../../../shared/entities/note.entity";
import { UserRepository } from "../../users/repositories/user.repository";

export class NoteRepository {
  private _repository = DatabaseConnection.connection.getRepository(NoteEntity);

  private mapEntityToModel(noteEntity: NoteEntity) {
    const user = UserModel.create(noteEntity.user.idUser, noteEntity.user.email, noteEntity.user.password)

    return NotesModel.create(
      noteEntity.id,
      noteEntity.title,
      noteEntity.description,
      noteEntity.saveNote,
      user )
  }

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

  public async create(note: NotesModel) {
    const userRepository = new UserRepository();
    const user = await userRepository.get(note.user.id);

    if(!user) {
      throw new Error('User not found!');
    }

    const noteEntity = this._repository.create({
      id: note.idNotes,
      title: note.title,
      description: note.description,
      saveNote: note.saveNote,
      user: user
    })

    await this._repository.save(noteEntity);

    return this.mapEntityToModel(noteEntity);
  }

}

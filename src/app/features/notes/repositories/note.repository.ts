import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { NotesModel } from "../../../models/note.models";
import { UserModel } from "../../../models/user.models";
import { NoteEntity } from "../../../shared/entities/note.entity";
import { SharedUserRepository } from "../../../shared/repositories/SharedUserRepository";
import { UserRepository } from "../../users/repositories/user.repository";

interface UpdateNoteDTO {
  title: string;
  description: string;
  saveNote: boolean;
  idUser: string;
}

export class NoteRepository {
  private _repository = DatabaseConnection.connection.getRepository(NoteEntity);

  // private mapEntityToModel(noteEntity: NoteEntity) {
  //   const user = UserModel.create(
  //     noteEntity.user.idUser,
  //     noteEntity.user.email,
  //     noteEntity.user.password)

  //   return NotesModel.create(
  //     noteEntity.idUser,
  //     noteEntity.title,
  //     noteEntity.description,
  //     noteEntity.saveNote,
  //     user )
  // }

  private mapEntityToModel(noteEntity: NoteEntity) {
    const user = UserModel.create(noteEntity.idUser, noteEntity.user.email, noteEntity.user.password)

    return NotesModel.create(
      noteEntity.id,
      noteEntity.title,
      noteEntity.description,
      noteEntity.saveNote,
      user
    )
  }

  public async listNotesById(idUser: string) {
    const notes = await this._repository.find({
      where: {
        idUser
      }
    });
    const result = notes.map(item => {
      return this.mapEntityToModel(item)
    })

    return result
  }


  public async list(){
    // const resutl = await this._repository.find({
    //   relations: {
    //     user: true
    //   }
    // })

    const result = await this._repository.find()

    const notes = result.map(item => {
      return this.mapEntityToModel(item)
    })

    return notes;
  }

  public async get(id: string) {
    const result = await this._repository.findOneBy({id})

    if(!result) {
      return null
    }

    return this.mapEntityToModel(result);
  }

  public async find(id: string) {

    const result = await this._repository.findOne({
      relations: {
        user: true
      },
      where: {
        id
      }
    })

    if(!result) {
      return null
    }

    return this.mapEntityToModel(result)
    // const result = await this._repository.findOneBy({
    //   id
    // })

    // if(!result) {
    //   return null
    // }

    // return this.mapEntityToModel(result)

    // // return result.map(item => {
    // //   return this.mapEntityToModel(item)
    // // })
  }

  public async create(note: NotesModel) {
    const userRepository = new UserRepository();
    const user = await userRepository.get(note.user.id);
    console.log(user)

    if(!user) {
      throw new Error('User not found!');
    }

    const noteEntity = this._repository.create({
      id: note.idNotes,
      title: note.title,
      description: note.description,
      saveNote: note.saveNote,
      idUser: note.user.id
    })

    await this._repository.save(noteEntity);

    const createNote = await this._repository.findOneBy({
      id: note.idNotes
    })

    return this.mapEntityToModel(createNote!);
  }

  public async delete(id: string) {
    return await this._repository.delete({id})
  }

  public async editUser(data: UpdateNoteDTO) {
    const noteUpdate = await this._repository.update(
      {
        idUser: data.idUser
      },
      {
        title: data.title,
        description: data.description,
        saveNote: data.saveNote
      }
    )

    return noteUpdate;

  }


}

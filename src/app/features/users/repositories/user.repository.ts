import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { UserModel } from "../../../models/user.models";
import { UserEntity } from "../../../shared/entities/user.entity";

// REPOSITÓRIO NÃO PODE RETORNAR ENTITY E SIM UM MODEL

interface UpdateUserDTO {
  id: string;
  email: string;
  password?: string;
}

export class UserRepository {
  private _repository = DatabaseConnection.connection.getRepository(UserEntity);

  private mapEntityToModel(userEntity: UserEntity) {
    return UserModel.create(
      userEntity.idUser,
      userEntity.email,
      userEntity.password)
  }

  public async list() {
    const result = await this._repository.find();

    const users = result.map(item => {
      return this.mapEntityToModel(item);
    })

    return users;
  };

  public async get(id: string) {
    const result = await this._repository.findOneBy({idUser: id});

    if(!result) {
      return null
    }

    return this.mapEntityToModel(result)
  }

  public async findByEmail(email: string) {
    const result = await this._repository.findOneBy({
      email: email
    })

    return result;
  }

  public async create(user: UserModel) {
    const userCreate = this._repository.create({
      idUser: user.id,
      email: user.email,
      password: user.password
    })

    const result = await this._repository.save(userCreate);
    console.log(result)
    return this.mapEntityToModel(result);

  }

  public async update(data: UpdateUserDTO) {
    const result = await this._repository.update(
      {
        idUser: data.id
      },
      {
        email: data.email,
        password: data.password
      }
    );

    return result.affected ?? 0;

  }

  public async delete(id: string) {

    return await this._repository.delete(id)

  }

  public async login(email: string, password: string) {
    const result = await this._repository.findOneBy({email, password});

    if(!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

}

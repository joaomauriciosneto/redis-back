import { DatabaseConnection } from "../../../main/database/typeorm.connection";
import { UserModel } from "../../models/user.models";
import { UserEntity } from "../entities/user.entity";

export class SharedUserRepository {

  private _repository = DatabaseConnection.connection.getRepository(UserEntity);

  private mapEntityToModel(userEntity: UserEntity) {
    return UserModel.create(
      userEntity.idUser,
      userEntity.email,
      userEntity.password)
  }

  public async getUserById(idUser: string) {
    const result = await this._repository.findOneBy({idUser});

    if(!result) return null;

    return this.mapEntityToModel(result)

  }
}

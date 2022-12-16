import { UserModel } from "../../../models/user.models";
import { UserRepository } from "../repositories/user.repository";

interface CreateUserDTO {
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private repository: UserRepository) {}

  public async execute(data: CreateUserDTO) {
    const user = new UserModel(
      data.email,
      data.password
    )

    const result = await this.repository.create(user);
    
    return result.toJson();

  }
}
import { UserRepository } from "../repositories/user.repository";

interface UpdateUserDTO {
  id: string;
  email: string;
  password: string;
}

export class UpdateUserUseCase {
  constructor(private repository: UserRepository){}

  public async execute(data: UpdateUserDTO) {
    const idUser = await this.repository.get(data.id)
    
    const user = await this.repository.update(data)

    return user;
  }
}
import { NoteRepository } from "../../../../../src/app/features/notes/repositories/note.repository";
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { DeleteUserUseCase } from "../../../../../src/app/features/users/usecases/delete-user.usecase";
import { NotesModel } from "../../../../../src/app/models/note.models";
import { UserModel } from "../../../../../src/app/models/user.models";
import { SharedUserRepository } from "../../../../../src/app/shared/repositories/SharedUserRepository";
import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";

describe('Delete an user unit test', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = new DeleteUserUseCase(
      new UserRepository()
    )
    return sut
  }

  test('should be able to return null found when user id is not found', async () => {
    const sut = makeSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(null)

    const result = sut.execute('any_id');

    await expect(result).rejects.toThrow(new Error('User not found!'))
  });

  // NÃO ESTÁ PASSANDO ESSE TESTE
  test('should not be able to delete a user if they have any note', async () => {
    const sut = makeSut();

    const user = new UserModel('teste@teste.com', '123abc')
    const note = new NotesModel('any_title', 'any_desc', false, user)

    jest.spyOn(SharedUserRepository.prototype, 'getUserById').mockResolvedValue(user)
    jest.spyOn(NoteRepository.prototype, 'create').mockResolvedValue(note)

    const result = await sut.execute('123abc');

    expect(result).not.toBeNull();
    expect(result).toHaveProperty('id');

  });
});

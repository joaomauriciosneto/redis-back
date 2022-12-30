import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { DeleteUserUseCase } from "../../../../../src/app/features/users/usecases/delete-user.usecase";

describe('delete an user unit test', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = new DeleteUserUseCase(
      new UserRepository()
    )
    return sut
  }

  test('should be able to return null if user does not exist', async () => {
    const sut = makeSut();

    jest.spyOn(UserRepository.prototype, 'delete').mockResolvedValue(null);

    const result = await sut.execute('any_id');

    expect(result).toBeNull();

  });
});

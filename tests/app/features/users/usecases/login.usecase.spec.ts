import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { LoginUserUseCase } from "../../../../../src/app/features/users/usecases/login-user.usecase";
import { UserModel } from "../../../../../src/app/models/user.models";

describe('login of the user', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = new LoginUserUseCase(
      new UserRepository()
    )
    return sut;
  }

  test('should be able to return a logged in user', async () => {
    const sut = makeSut();
    const user = new UserModel('any_email', 'any_password');

    jest.spyOn(UserRepository.prototype, 'login').mockResolvedValue(user);

    const result = await sut.execute(user.email, user.password);

    expect(result).not.toBeNull();
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password')
  });

  test('should be able to return null if user does not exist', async () => {
    const sut = makeSut();

    jest.spyOn(UserRepository.prototype, 'login').mockResolvedValue(null);

    const result = await sut.execute('any_email', 'any_password');

    expect(result).toBeNull();
  });

  test('should be able to return error if there is any problem in repository', async () => {
    const sut = makeSut();

    jest.spyOn(UserRepository.prototype, 'login').mockRejectedValue(new Error());

    const result = sut.execute('any_email', 'any_password')

    expect(result).rejects.toThrowError(new Error());
  });
});

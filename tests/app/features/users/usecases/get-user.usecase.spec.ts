import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { GetUserUseCase } from "../../../../../src/app/features/users/usecases/get-user.usecase";
import { UserModel } from "../../../../../src/app/models/user.models";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";

describe('Get user usecase unit test', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = new GetUserUseCase(
      new UserRepository(),
      new CacheRepository()
    )
    return sut
  }

  test('should be able to return null if user does not exist', async() => {
    const sut = makeSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(null);

    const result = await sut.execute('any_id')

    expect(result).toBeNull();
  });

  test('should be able to return a valid user if id exists', async () => {
    const sut = makeSut();
    const user = new UserModel('any_email', 'any_password')

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user);

    jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(null);

    const result = await sut.execute(user.id)

    expect(result).not.toBeNull();
    expect(result.id).toBe(user.id);

  });
});

import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import { UpdateUserUseCase } from '../../../../../src/app/features/users/usecases/upadate-user.usecase';
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository';
import { CacheRepository } from '../../../../../src/app/shared/repositories/cache.repository';
import { SharedUserRepository } from '../../../../../src/app/shared/repositories/SharedUserRepository';

describe('Update an user unit test', () => {
  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = new UpdateUserUseCase(
      new UserRepository(),
      new CacheRepository()
    )
    return sut
  }

  test('shoul be able to return null if no user exists', async () => {
    const sut = makeSut();

    jest.spyOn(SharedUserRepository.prototype, 'getUserById').mockResolvedValue(null);

    const userDTO = {
      id: 'any_id',
      email: 'any_email',
      password: 'any_password'
    }

    const result = await sut.execute(userDTO);

    expect(result).toBeNull();
    expect(result).toBeDefined();

  });
});

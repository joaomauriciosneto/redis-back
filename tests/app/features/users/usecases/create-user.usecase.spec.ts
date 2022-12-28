import {DatabaseConnection} from '../../../../../src/main/database/typeorm.connection'
import {CacheConnection} from '../../../../../src/main/database/cache.connection'
import {CreateUserUseCase} from '../../../../../src/app/features/users/usecases/create-user.usecase'
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository';
import { CacheRepository } from '../../../../../src/app/shared/repositories/cache.repository';
import { UserModel } from '../../../../../src/app/models/user.models';

describe('Create a new user with unit test', () => {
  beforeAll(async () => {
    await DatabaseConnection.connect();
    await CacheConnection.connect();
  })

  afterAll(async () => {
    await DatabaseConnection.connection.destroy();
    await CacheConnection.connection.quit();
  })

  const makeSut = () => {
    const sut = new CreateUserUseCase(
      new UserRepository(),
      new CacheRepository()
    )
    return sut
  }

  test('should return the data of a new user when executing create successfully', async () => {
    const sut = makeSut();

    const user = {
      email: 'teste@teste.com',
      password: '123'
    }

    jest.spyOn(UserRepository.prototype, 'create').mockResolvedValue(new UserModel(user.email, user.password))

    jest.spyOn(CacheRepository.prototype, 'delete').mockResolvedValue();

    const result = await sut.execute(user);

    expect(result).not.toBeNull();
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email',user.email);
    expect(result).toHaveProperty('password', user.password);

  });
});

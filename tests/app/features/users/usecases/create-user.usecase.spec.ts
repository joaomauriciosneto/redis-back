import {CreateUserUseCase} from '../../../../../src/app/features/users/usecases/create-user.usecase'
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository';
import { CacheRepository } from '../../../../../src/app/shared/repositories/cache.repository';
import { UserModel } from '../../../../../src/app/models/user.models';
import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import {serverError} from '../../../../../src/app/shared/util/response.helper'
import { UserEntity } from '../../../../../src/app/shared/entities/user.entity';

describe('Create a new user with unit test', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

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

  test('should not able to create two users with the same email ', async () => {
    const sut = makeSut();

    const user = {
      email: 'teste@teste.com',
      password: '123abc'
    }

    jest.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue(new UserEntity())

    jest.spyOn(CacheRepository.prototype, 'delete').mockResolvedValue();

    const result = sut.execute(user);

    await expect(result).rejects.toThrow(new Error('Email already used!'))
  });
});

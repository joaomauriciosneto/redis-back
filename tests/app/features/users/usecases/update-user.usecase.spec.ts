import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import { UpdateUserUseCase } from '../../../../../src/app/features/users/usecases/upadate-user.usecase';
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository';
import { CacheRepository } from '../../../../../src/app/shared/repositories/cache.repository';
import { UserModel } from '../../../../../src/app/models/user.models';

interface SutTypes {
  repository: UserRepository;
  cacheRepository: CacheRepository;
  sut: UpdateUserUseCase;
}

const makeSut = (): SutTypes => {
  const repository = new UserRepository();
  const cacheRepository = new CacheRepository();
  const sut = new UpdateUserUseCase(
    repository, cacheRepository
  )
  return {repository, cacheRepository, sut}
}

describe('Update an user unit test', () => {

  const user = new UserModel(
    'any_email',
    'any_password'
  );

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());
  afterEach(() => jest.clearAllMocks());

  test('should be able to return an updated user', async () => {

    const {repository, cacheRepository, sut} = makeSut();

    jest.spyOn(repository, 'get').mockResolvedValue(user);

    const observer = jest.spyOn(repository, 'update');

    jest.spyOn(repository, 'update').mockResolvedValue(0);

    const result = await sut.execute({
      id: 'any_id',
      email: 'new_email',
      password: 'new_password'
    })

    user.email = 'new_email';
    user.password = 'new_password';

    expect(result).toBe(0);
    expect(observer).toHaveBeenCalledTimes(1);
    expect(observer).toHaveBeenCalledWith(user);

  });
});

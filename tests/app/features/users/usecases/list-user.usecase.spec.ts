import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { ListUsersUseCase } from "../../../../../src/app/features/users/usecases/list-user.usecase";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";

describe('listing all users', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = new ListUsersUseCase(
      new UserRepository(),
      new CacheRepository()
    )
    return sut
  }

  test('should be able to list all users', async () => {
    const sut = makeSut();
    const result = await sut.execute()

    jest.spyOn(UserRepository.prototype, 'list').mockResolvedValue(result);

    expect(result).toBeDefined();

  });

});

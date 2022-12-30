import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import { UpdateUserUseCase } from '../../../../../src/app/features/users/usecases/upadate-user.usecase';
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository';
import { CacheRepository } from '../../../../../src/app/shared/repositories/cache.repository';

describe('Update an user unit test', () => {
  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = new UpdateUserUseCase(
      new UserRepository(),
      new CacheRepository()
    )
  }
});

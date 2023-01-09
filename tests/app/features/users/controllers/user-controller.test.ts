import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import {createServer} from '../../../../../src/main/config/express.config';
import { DatabaseConnection } from '../../../../../src/main/database/typeorm.connection';
import { UserEntity } from '../../../../../src/app/shared/entities/user.entity';
import { UserModel } from '../../../../../src/app/models/user.models';
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository';
import request from 'supertest';

describe('User - integration controller test', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = createServer();
    return sut;
  }

  beforeEach(async () => {
    const manager = DatabaseConnection.connection.manager;

    await manager.clear(UserEntity);
  })

  const createUser = async () => {

    const user = new UserModel('teste@teste.com', '123');
    const userRepository = new UserRepository();
    await userRepository.create(user);

    return user;

  }

  test('should be able return HTTP 200 if a user exists', async () => {

    const app = makeSut();
    const user = await createUser();
    const result = await request(app).get(`/users/${user.id}`).send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(200);
    expect(result).toHaveProperty('body.ok', true);

  });

  test('should be able return HTTP 404 if a not user exists', async () => {

    const app = makeSut();
    const result = await request(app).get(`/uers/132abc`).send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(404);

  });

});

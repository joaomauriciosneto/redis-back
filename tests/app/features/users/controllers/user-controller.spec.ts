import {openConnection} from '../../../../util/open-connection'
import {closeConnection} from '../../../../util/close-connection'
import {createServer} from '../../../../../src/main/config/express.config'
import request from 'supertest';
import { CreateUserUseCase } from '../../../../../src/app/features/users/usecases/create-user.usecase';
import { UserModel } from '../../../../../src/app/models/user.models';
import { SharedUserRepository } from '../../../../../src/app/shared/repositories/SharedUserRepository';
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository';
import { UpdateUserUseCase } from '../../../../../src/app/features/users/usecases/upadate-user.usecase';

describe('User controller unit tests', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = createServer();
    return sut;
  }

  test('should be able to return http 400 if email is not provided', async () => {
    const app = makeSut();

    const result = await request(app).post('/users').send({});

    expect(result.statusCode).toBe(400);
  });

  test('should be able to return http 400 if password is not provided', async () => {
    const app = makeSut();

    const result = await request(app).post('/users').send({});

    expect(result.statusCode).toBe(400);
  });

  test('should be able to return HTTP 201 when user is successfully created', async () => {
    const app = makeSut();

    const user = {
      email: 'any_email',
      password: 'any_password'
    };

    jest.spyOn(CreateUserUseCase.prototype, 'execute').mockResolvedValue(
      new UserModel(
        user.email,
        user.password
      ).toJson()
    );

    const result = await request(app).post('/users').send(user);

    expect(result.statusCode).toBe(201);
    expect(result.body).not.toBeNull();
    expect(result).toHaveProperty('body.ok', true);
    expect(result).toHaveProperty('body.mensagem', 'User successfully created!');
  });

  test('should be able to return 404 if user does not exist', async () => {
    const app = makeSut();
    const result = await request(app).get('/users/123abc').send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toBe(404);
    expect(result).toHaveProperty('body.ok', false);
  });

  test('must be able to return HTTP 501 when usecase throws exception', async () => {
    const app = makeSut();

    const user = {
      email: 'any_email',
      password: 'any_password'
    }

    jest.spyOn(CreateUserUseCase.prototype, 'execute').mockImplementation(() => {
      throw new Error('Unit test error');
    });

    const result = await request(app).post('/users').send(user);

    expect(result.statusCode).toBe(501);
    expect(result.body).not.toBeNull();
    expect(result).toHaveProperty('body.ok', false);
    expect(result).toHaveProperty(
      'body.message',
      new Error('Unit test error').toString()
    )
  });

  test('should be able to return a user if it exists', async () => {
    const app = makeSut();

    const user = new UserModel(
      'teste@teste.com',
      '123'
    )

    jest.spyOn(SharedUserRepository.prototype, 'getUserById').mockResolvedValue(user);

    const result = await request(app).get(`/users`).send();

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result.statusCode).toBe(200);

  });

  test('should be able to return an HTTP 200 if the user is updated successfully', async () => {
    const app = makeSut();

    const user = new UserModel(
      'any_email',
      '123'
    )

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user);
    jest.spyOn(UserRepository.prototype, 'update').mockResolvedValue(0);

    const result = await request(app).put(`/users/${user.id}`).send({
      email: 'teste2@teste2.com'
    });

    expect(result).toBeDefined();
    expect(result.body).not.toBeNull();
    expect(result.statusCode).toBe(200);
  });

  test('should be able to delete a user if it exists', async () => {
    const app = makeSut();

    const user = {
      idUser: '123abc',
      email: 'teste@teste.com',
      password: '123'
    };

    const result = await request(app).delete(`/users/${user.idUser}`).send();

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
  });
});

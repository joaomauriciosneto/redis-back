import { Request, Response } from "express";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { notFound, serverError, success } from "../../../shared/util/response.helper";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserUseCase } from "../usecases/create-user.usecase";
import { DeleteUserUseCase } from "../usecases/delete-user.usecase";
import { GetUserUseCase } from "../usecases/get-user.usecase";
import { ListUsersUseCase } from "../usecases/list-user.usecase";
import { LoginUserUseCase } from "../usecases/login-user.usecase";
import { UpdateUserUseCase } from "../usecases/upadate-user.usecase";

export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const {email, password} = req.body;
      const usecase = new CreateUserUseCase(
        new UserRepository(),
        new CacheRepository()
      );

      const restult = await usecase.execute({
        email,
        password
      })

      return success(res, restult, 'User successfully created!', 201)

    } catch (error: any) {
      return serverError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const usecase = new ListUsersUseCase(
        new UserRepository(),
        new CacheRepository()
      );

      const result = await usecase.execute();

      return success(res, result, 'Users successfully listed!');

    } catch (error: any) {
        return serverError(res, error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const {idUser} = req.params;
      const usecase = new GetUserUseCase(
        new UserRepository(),
        new CacheRepository()
      );

      const result = await usecase.execute(idUser);

      if(!result) {
        return res.status(404).send({
          ok: false,
          message: 'User not found!'
        })
      }

      return success(res, result, 'Listing User by Id!');

    } catch (error: any) {
      return serverError(res, error)
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const {idUser} = req.params;
      const {email, password} = req.body;
      const usecase = new UpdateUserUseCase(
        new UserRepository(),
        new CacheRepository()
      );

      const result = await usecase.execute({
        id: idUser,
        email,
        password
      })

      if(result == null) {
        return res.status(404).send({
          ok: false,
          message: 'User not found!'
        })
      }

      return success(res, result, 'User updated successfully!');

    } catch (error: any) {
      return serverError(res, error)
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const {idUser} = req.params;
      const repository = new UserRepository();
      const usecase = new DeleteUserUseCase(repository);

      const result = await usecase.execute(idUser);

      return success(res, result, 'Listing successfully deleted!');

    } catch (error: any) {
      return serverError(res, error)
    }
  }

  public async login(req: Request, res: Response) {

    try {

      const {email, password} = req.body;
      const usecase = new LoginUserUseCase(
        new UserRepository()
      );

      const result = await usecase.execute(email, password);

      if(!result) {
        return res.status(400).send({
          ok: false,
          message: 'Not found!'
        })
      }

      return success(res, result, 'User logged in!');

    } catch (error: any) {

      return res.status(500).send({
        ok: false,
        message: error.toString()
      })

    }

  }
}

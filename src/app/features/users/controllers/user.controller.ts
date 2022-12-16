import { Request, Response } from "express";
import { serverError, success } from "../../../shared/util/response.helper";
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
      const repository = new UserRepository();
      const usecase = new CreateUserUseCase(repository);

      const restult = await usecase.execute({
        email,
        password
      })

      return success(res, restult, 'User successfully created!')

    } catch (error: any) {
      return serverError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const repository = new UserRepository();
      const usecase = new ListUsersUseCase(repository);

      const result = await usecase.execute();

      return success(res, result, 'Users successfully listed!');

    } catch (error: any) {
        return serverError(res, error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const repository = new UserRepository();
      const usecase = new GetUserUseCase(repository);

      const result = await usecase.execute({id});

      return success(res, result, 'Listing User by Id!');
      
    } catch (error: any) {
      return serverError(res, error)
    }
  }

  // FALTA VER O MÉTODO NO USECASE
  public async update(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const {email, password} = req.body;
      const repository = new UserRepository();
      const usecase = new UpdateUserUseCase(repository);
      
    } catch (error: any) {
      return serverError(res, error)
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const repository = new UserRepository();
      const usecase = new DeleteUserUseCase(repository);

      const result = await usecase.execute({id});

      return success(res, result, 'Listing successfully deleted!');

    } catch (error: any) {
      return serverError(res, error)
    }
  }

  public async login(req: Request, res: Response) {

    try {

      const {email, password} = req.body;
      const repository = new UserRepository();
      const usecase = new LoginUserUseCase(repository);

      const result = await usecase.execute(email, password);
      console.log(result)

      return success(res, result, 'User logged in!');
      
    } catch (error: any) {
      
      return res.status(500).send({
        ok: false,
        message: error.toString()
      })

    }

  }
}
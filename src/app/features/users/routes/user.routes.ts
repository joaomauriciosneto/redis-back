import { Router } from "express";
import { userValidator } from "../../../shared/middlewares/user.validator.middleware";
import { UserController } from "../controllers/user.controller";

export const userRoutes = () => {

  const router = Router();

  router.get('/', new UserController().list);
  router.post('/login', new UserController().login);
  router.get('/:idUser', [userValidator], new UserController().get);
  router.post('/', new UserController().create);
  router.delete('/:idUser', new UserController().delete);
  router.put('/:idUser', new UserController().update);

  return router;

}


import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const userRoutes = () => {

  const router = Router();

  router.get('/', new UserController().list); 
  router.post('/login', new UserController().login);
  router.get('/:id', new UserController().get);
  router.post('/', new UserController().create);
  router.delete('/:id', new UserController().delete);

  return router;

}


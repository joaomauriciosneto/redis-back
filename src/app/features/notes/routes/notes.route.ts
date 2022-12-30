import { Router } from "express"
import { NotesController } from "../controllers/note.controller";

export const noteRoutes = () => {

  const router = Router();

  router.get('/', new NotesController().list);
  router.post('/:idUser', new NotesController().create);
  router.get('/:idUser', new NotesController().get);

  return router;

}

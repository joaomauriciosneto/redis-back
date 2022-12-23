import { Router } from "express"
import { NotesController } from "../controllers/note.controller";

export const noteRoutes = () => {

  const router = Router();

  router.get('/', new NotesController().list);
  router.post('/:id', new NotesController().create);
  router.get('/:id', new NotesController().get);

  return router;

}

import { Router } from "express"
import { userValidator } from "../../../shared/middlewares/user.validator.middleware";
import { NotesController } from "../controllers/note.controller";

export const noteRoutes = () => {

  const router = Router();

  router.get('/', new NotesController().list);
  router.post('/:idUser', new NotesController().create);
  router.get('/:idUser', new NotesController().get);
  router.put('/:idUser/:idNotes', new NotesController().updateNote);
  router.delete('/:idUser/:idNotes', new NotesController().DeleteNoteByUser);

  return router;

}

import { Router } from "express"
import { NotesController } from "../controllers/note.controller";
import { createNoteValidator } from "../validators/create-note.validator";

export const noteRoutes = () => {

  const router = Router();

  router.get('/', new NotesController().list);
  router.post('/:idUser', [createNoteValidator],new NotesController().create);
  router.get('/:idUser', new NotesController().get);
  router.put('/:idUser/:idNotes', new NotesController().updateNote);
  router.delete('/:idUser/:idNotes', new NotesController().DeleteNoteByUser);

  return router;

}

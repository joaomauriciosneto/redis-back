import { Request, Response } from "express";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { notFound, serverError, success } from "../../../shared/util/response.helper";
import { UserRepository } from "../../users/repositories/user.repository";
import { NoteRepository } from "../repositories/note.repository";
import { CreateNoteUseCase } from "../usecases/create-note.usecase";
import { ListNoteUserUseCase } from "../usecases/list-note-user.usecase";
import { ListNotesUseCase } from "../usecases/list-note.usecase";

export class NotesController {

  public async create(req: Request, res: Response) {

    try {

      const {idUser} = req.params;
      const {title, description, saveNote} = req.body;

      const usecase = new CreateNoteUseCase(
        new UserRepository(),
        new NoteRepository()
      )

      const result = await usecase.execute({
        title,
        description,
        saveNote,
        idUser
      })

      if(!result) {
        return notFound(res, 'Not found!')
      }

      console.log(result)

      return success(res, result, 'Note successfully added!')

    } catch (error: any) {
      return serverError(res, error)
    }

  }

  public async list(req: Request, res: Response) {

    try {

      const usecase = new ListNotesUseCase(
        new NoteRepository(),
        new CacheRepository()
      )

      const result = await usecase.execute();

      return success(res, result, 'Listing all notes!')

    } catch (error: any) {
      return serverError(res, error)
    }

  }

  public async get(req: Request, res: Response) {

    try {

      const {id} = req.params;
      const usecase = new ListNoteUserUseCase(
        new NoteRepository()
      )

      const result = await usecase.execute(id);
      // console.log(result)

      if(!result) {
        return notFound(res, 'Not found!')
      }

      return success(res, result, 'Showing user notes!');

    } catch (error: any) {
      return serverError(res, error)
    }

  }

}

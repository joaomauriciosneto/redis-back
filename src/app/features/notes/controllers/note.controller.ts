import { Request, Response } from "express";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { SharedUserRepository } from "../../../shared/repositories/SharedUserRepository";
import { notFound, serverError, success } from "../../../shared/util/response.helper";
import { UserRepository } from "../../users/repositories/user.repository";
import { NoteRepository } from "../repositories/note.repository";
import { CreateNoteUseCase } from "../usecases/create-note.usecase";
import { DeleteNoteByUser } from "../usecases/delete-note-user.usecase";
import { ListNoteUserUseCase } from "../usecases/list-note-user.usecase";
import { ListNotesUseCase } from "../usecases/list-note.usecase";
import { UpdateNoteUsecase } from "../usecases/update-note.usecase";

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
        return res.status(404).send({
          ok: false,
          message: 'User not found!'
        })
      }

      return res.status(201).send({
        ok: true,
        message: 'Note successfully added!',
        data: result
      })

    } catch (error: any) {
      return serverError(res, error)
    }

  }

  public async updateNote(req: Request, res: Response) {

    try {

      const {idUser, idNotes} = req.params;
      const {title, description, saveNote} = req.body;

       const usecase = new UpdateNoteUsecase(
        new NoteRepository(),
        new CacheRepository(),
        new SharedUserRepository()
      )

      const result = await usecase.execute({
        title,
        description,
        saveNote,
        idUser,
        idNotes
      })

      if(result == null) {
        return notFound(res, result, 'Note not found!')
      }

      return success(res, result, 'Note successfully updated!')

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

      const {idUser} = req.params;
      const usecase = new ListNoteUserUseCase(
        new UserRepository(),
        new NoteRepository(),
        new SharedUserRepository()
      )

      const result = await usecase.execute(idUser);

      if(!result) {
        return notFound(res, 'Not found!')
      }

      return success(res, result, 'Showing user notes!');

    } catch (error: any) {
      return serverError(res, error)
    }

  }

  public async DeleteNoteByUser(req: Request, res: Response) {

    try {

      const {idUser, idNotes} = req.params;
      const usecase = new DeleteNoteByUser(
        new NoteRepository()
      )

      const result = await usecase.execute(idUser, idNotes);

      // if(!result) {
      //   return res.status(404).send({
      //     ok: false,
      //     message: 'Note not found!!'
      //   })
      // }

      return success(res, result, 'Note successfully deleted!')

    } catch (error: any) {
      return serverError(res, error)
    }

  }

}

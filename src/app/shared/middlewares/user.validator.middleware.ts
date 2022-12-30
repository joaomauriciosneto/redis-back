import { NextFunction, Request, Response } from "express";
import { NotesController } from "../../features/notes/controllers/note.controller";
import { UserController } from "../../features/users/controllers/user.controller";
import { SharedUserRepository } from "../repositories/SharedUserRepository";
import { notFound } from "../util/response.helper";

// export const userValidator = (req: Request, res: Response, next: NextFunction) => {

//     const {email} = req.body

//     const userName = usersList.some(user => user.email === email)

//     if(userName) {
//         return res.status(400).send({
//             ok: false,
//             message: 'Email already existssssss!'
//         })
//     }
//     next();
// }

export const userValidator = (req: Request, res: Response, next: NextFunction) => {
  const {idUser} = req.params

  //const user = new SharedUserRepository().getUserById(idUser)

  if(!idUser) {
    return res.status(404).send({
      ok: false,
      message: 'User not found!'
    })
  }

  next();
}

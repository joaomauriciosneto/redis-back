import { NextFunction, Request, Response } from "express";
import { SharedUserRepository } from "../repositories/SharedUserRepository";

export const userValidator = async (req: Request, res: Response, next: NextFunction) => {
  const {idUser} = req.params

  const userRepository= new SharedUserRepository();
  const user = await userRepository.getUserById(idUser)

  if(!user) {
    return res.status(404).send({
      ok: false,
      message: 'User not found!'
    })
  }

  next();
}

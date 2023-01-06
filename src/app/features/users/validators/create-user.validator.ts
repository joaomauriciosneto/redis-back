import { NextFunction, Request, Response } from "express";

export const createUserValidator = (req: Request, res: Response, next: NextFunction) => {

  const {email, password} = req.body;

  if(!email) {
    return res.status(400).send({
      ok: false,
      message: 'Email not provided!'
    })
  }

  if(!password) {
    return res.status(400).send({
      ok: false,
      message: 'Password not provided!'
    })
  }

  next();

}

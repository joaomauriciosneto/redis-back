import { NextFunction, Request, Response } from "express";

export const createNoteValidator = (req: Request, res: Response, next: NextFunction) => {

  const {title, description} = req.body;

  if(!title) {
    return res.status(400).send({
      ok: false,
      message: 'Title not provided!'
    })
  }

  if(!description) {
    return res.status(400).send({
      ok: false,
      message: 'Description not provided!'
    })
  }

  next();

}

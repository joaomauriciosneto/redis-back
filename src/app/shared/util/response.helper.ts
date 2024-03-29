import { Response } from "express";

export const serverError = (res: Response, error: any) => {
    return res.status(501).send({
        ok: false,
        message: error.toString(),
    });
};

export const success = (res: Response, data?: any, message?: string, code?: number) => {
    return res.status(code ?? 200).send({
        ok: true,
        mensagem: message,
        data,
    });
};

export const notFound = (res: Response, data?: any, message?: string) => {
  return res.status(404).send({
      ok: false,
      mensagem: message,
      data,
  });
};

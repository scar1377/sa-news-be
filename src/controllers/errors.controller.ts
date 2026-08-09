import { Request, Response, NextFunction } from "express";
import { isCustomError } from "../utils/helper-function";

export const customErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (isCustomError(err)) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

export const internalServerErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err, "<<<<<<<<<<<<<err");
  res.status(500).send({ msg: "Internal service error" });
};

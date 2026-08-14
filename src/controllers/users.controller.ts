import { Request, Response, NextFunction } from "express";
import { selectUsers } from "../models/users.model.js";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

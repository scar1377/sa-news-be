import { Request, Response, NextFunction } from "express";
import { selectTopics } from "../models/topics.model";

export const getTopics = (req: Request, res: Response, next: NextFunction) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

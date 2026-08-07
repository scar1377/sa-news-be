import { Request, Response, NextFunction } from "express";
import { selectArticles } from "../models/articles.model";

export const getArticles = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

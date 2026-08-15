import { Request, Response } from "express";
import path from "path";

export const getHomePage = (req: Request, res: Response) => {
  res.sendFile(path.resolve("views/index.html"));
};

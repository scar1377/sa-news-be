import { Router } from "express";
import { deleteCommentById } from "../controllers/comments.controller.js";
export const commentsRouter = Router();
commentsRouter.delete("/:comment_id", deleteCommentById);

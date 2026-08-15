import { Router } from "express";
import { getHomePage } from "../controllers/views.controller.js";

export const viewsRouter = Router();

viewsRouter.get("/", getHomePage);

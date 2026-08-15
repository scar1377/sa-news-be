import { Router } from "express";
import { getEndpoints } from "../controllers/api.controller.js";
import { topicsRouter } from "./topics.router.js";
import { articlesRouter } from "./articles.router.js";
import { usersRouter } from "./users.router.js";
import { commentsRouter } from "./comments.router.js";

export const apiRouter = Router();

apiRouter.get("/", getEndpoints);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);

import express from "express";
import { topicsRouter } from "./routers/topics.router.js";
import { articlesRouter } from "./routers/articles.router.js";
import {
  customErrorHandler,
  internalServerErrorHandler,
  prismaErrorHandler,
} from "./controllers/errors.controller.js";
import { usersRouter } from "./routers/users.router.js";
import { commentsRouter } from "./routers/comments.router.js";
import { getEndpoints } from "./controllers/api.controller.js";

const app = express();
app.use(express.json());

app.get("/api", getEndpoints);
app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

app.all("/{*invalidPath}", (req, res) => {
  res.status(404).send({
    msg: "Path not found",
  });
});

app.use(customErrorHandler);
app.use(prismaErrorHandler);
app.use(internalServerErrorHandler);
export default app;

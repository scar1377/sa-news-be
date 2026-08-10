import express from "express";
import { topicsRouter } from "./routers/topics.router";
import { articlesRouter } from "./routers/articles.router";
import {
  customErrorHandler,
  internalServerErrorHandler,
  prismaErrorHandler,
} from "./controllers/errors.controller";

const app = express();
app.use(express.json());

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.all("/{*invalidPath}", (req, res) => {
  res.status(404).send({
    msg: "Path not found",
  });
});

app.use(customErrorHandler);
app.use(prismaErrorHandler);
app.use(internalServerErrorHandler);
export default app;

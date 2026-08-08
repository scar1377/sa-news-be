import express from "express";
import { topicsRouter } from "./routers/topics.router";
import { articlesRouter } from "./routers/articles.router";
import { Request, Response, NextFunction } from "express";

const app = express();

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.all("/{*invalidPath}", (req, res) => {
  res.status(404).send({
    msg: "Path not found",
  });
});

app.use((err: Error, req: Request, res: Response) => {
  console.log(err);
  res.status(500).send({ msg: "Internal service error" });
});
export default app;

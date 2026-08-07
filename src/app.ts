import express from "express";
import { topicsRouter } from "./routers/topics.router";
import { articlesRouter } from "./routers/articles.router";

const app = express();

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.all("/{*invalidPath}", (req, res) => {
  res.status(404).send({
    msg: "Path not found",
  });
});
export default app;

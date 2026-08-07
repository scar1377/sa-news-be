import express from "express";
import { topicsRouter } from "./routers/topics.router";

const app = express();

app.use("/api/topics", topicsRouter);

app.all("/{*invalidPath}", (req, res) => {
  res.status(404).send({
    msg: "Path not found",
  });
});
export default app;

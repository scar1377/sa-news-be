import express from "express";
import { topicsRouter } from "./routers/topics.router";

const app = express();

app.use("/api/topics", topicsRouter);

export default app;

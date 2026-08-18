import express from "express";
import cors from "cors";

import {
  customErrorHandler,
  internalServerErrorHandler,
  prismaErrorHandler,
} from "./controllers/errors.controller.js";
import { apiRouter } from "./routers/api.router.js";
import { viewsRouter } from "./routers/views.router.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", viewsRouter);
app.use("/api", apiRouter);

app.all("/{*invalidPath}", (req, res) => {
  res.status(404).send({
    msg: "Path not found",
  });
});

app.use(customErrorHandler);
app.use(prismaErrorHandler);
app.use(internalServerErrorHandler);
export default app;

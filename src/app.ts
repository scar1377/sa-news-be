import express from "express";

import {
  customErrorHandler,
  internalServerErrorHandler,
  prismaErrorHandler,
} from "./controllers/errors.controller.js";
import { apiRouter } from "./routers/api.router.js";

const app = express();
app.use(express.json());

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

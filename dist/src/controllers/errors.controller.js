import { isCustomError } from "../utils/helper-function.js";
import { Prisma } from "../generated/prisma/client.js";
export const customErrorHandler = (err, req, res, next) => {
    if (isCustomError(err)) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
export const prismaErrorHandler = (err, req, res, next) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025" &&
        err.meta &&
        typeof err.meta.modelName) {
        res.status(404).send({ msg: `${err.meta.modelName} does not exist` });
    }
    else
        next(err);
};
export const internalServerErrorHandler = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal service error" });
};

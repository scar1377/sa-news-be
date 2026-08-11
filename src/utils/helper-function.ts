import { prisma } from "../../prisma/db/connection";
import { CustomError } from "../types/api.types";

export const isCustomError = (error: unknown): error is CustomError => {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  if (!("status" in error) || !("msg" in error)) {
    return false;
  }

  return typeof error.status === "number" && typeof error.msg === "string";
};

export const isValidId = (id: number) => {
  return !Number.isNaN(id) && Number.isInteger(id);
};

export const checkUserExists = async (username: string) => {
  const existedItem = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!existedItem) {
    return Promise.reject({
      status: 404,
      msg: `User does not exist`,
    });
  }
};

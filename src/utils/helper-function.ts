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

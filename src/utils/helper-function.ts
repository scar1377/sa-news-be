import { prisma } from "../../prisma/db/connection";
import { Prisma } from "../generated/prisma/client";
import { CustomError, SortByQuery } from "../types/api.types";

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
  const existedUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!existedUser) {
    return Promise.reject({
      status: 404,
      msg: `User does not exist`,
    });
  }
};

export const isSortByQuery = (sort_by: unknown): sort_by is SortByQuery => {
  const sortByGreenList = [
    "article_id",
    "title",
    "topic",
    "created_at",
    "author",
    "votes",
    "comment_count",
  ];
  if (typeof sort_by === "string" && sortByGreenList.includes(sort_by))
    return true;
  else return false;
};

export const isOrderQuery = (order: unknown): order is Prisma.SortOrder => {
  const orderGreenList = ["asc", "desc"];
  if (typeof order === "string" && orderGreenList.includes(order.toLowerCase()))
    return true;
  else return false;
};

export const checkTopicExists = async (slug: string) => {
  const existedTopic = await prisma.topic.findUnique({
    where: {
      slug,
    },
  });
  if (!existedTopic) {
    return Promise.reject({
      status: 404,
      msg: `Topic does not exist`,
    });
  }
};

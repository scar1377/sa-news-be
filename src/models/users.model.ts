import { prisma } from "../../prisma/db/connection.js";

export const selectUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

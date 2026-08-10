import { prisma } from "../../prisma/db/connection";

export const selectUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

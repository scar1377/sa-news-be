/*
  Warnings:

  - You are about to drop the column `authorUsername` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `topicSlug` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `articleId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `authorUsername` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - Added the required column `author` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `article_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_authorUsername_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_topicSlug_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorUsername_fkey";

-- DropIndex
DROP INDEX "Article_authorUsername_idx";

-- DropIndex
DROP INDEX "Article_topicSlug_idx";

-- DropIndex
DROP INDEX "Comment_articleId_idx";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "authorUsername",
DROP COLUMN "topicSlug",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "articleId",
DROP COLUMN "authorUsername",
DROP COLUMN "createdAt",
ADD COLUMN     "article_id" INTEGER NOT NULL,
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUrl",
ADD COLUMN     "avatar_url" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Article_topic_idx" ON "Article"("topic");

-- CreateIndex
CREATE INDEX "Article_author_idx" ON "Article"("author");

-- CreateIndex
CREATE INDEX "Comment_article_id_idx" ON "Comment"("article_id");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_topic_fkey" FOREIGN KEY ("topic") REFERENCES "Topic"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("article_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;

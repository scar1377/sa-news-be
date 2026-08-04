/*
  Warnings:

  - Added the required column `article_img_url` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "article_img_url" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Article_votes_idx" ON "Article"("votes");

-- CreateIndex
CREATE INDEX "Comment_articleId_idx" ON "Comment"("articleId");

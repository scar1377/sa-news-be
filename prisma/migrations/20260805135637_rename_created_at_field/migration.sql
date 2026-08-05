/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Article` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Article_createdAt_idx";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Article_created_at_idx" ON "Article"("created_at");

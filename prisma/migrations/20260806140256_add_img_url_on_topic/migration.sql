/*
  Warnings:

  - Added the required column `img_url` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "img_url" TEXT NOT NULL;

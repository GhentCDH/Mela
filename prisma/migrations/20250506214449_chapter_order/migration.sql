/*
  Warnings:

  - You are about to drop the column `order` on the `chapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chapter" DROP COLUMN "order",
ADD COLUMN     "chapter_order" INTEGER;

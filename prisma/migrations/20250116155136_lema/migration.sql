/*
  Warnings:

  - You are about to drop the column `comparativve` on the `Lema` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lema" DROP COLUMN "comparativve",
ADD COLUMN     "comparative" BOOLEAN NOT NULL DEFAULT false;

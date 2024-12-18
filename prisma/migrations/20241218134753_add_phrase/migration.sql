/*
  Warnings:

  - A unique constraint covering the columns `[mela_id]` on the table `Phrase` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mela_id` to the `Phrase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Phrase" ADD COLUMN     "mela_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Phrase_mela_id_key" ON "Phrase"("mela_id");

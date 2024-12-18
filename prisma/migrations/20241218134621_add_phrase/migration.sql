/*
  Warnings:

  - You are about to drop the column `mela_id` on the `Phrase` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Phrase_mela_id_key";

-- AlterTable
ALTER TABLE "Phrase" DROP COLUMN "mela_id",
ALTER COLUMN "translation" DROP NOT NULL;

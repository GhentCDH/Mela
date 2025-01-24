/*
  Warnings:

  - You are about to drop the column `mela_id` on the `Phrase` table. All the data in the column will be lost.
  - You are about to drop the column `mela_id` on the `Text` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TextType" AS ENUM ('SOURCE', 'TRANSLATION');

-- DropIndex
DROP INDEX "Phrase_mela_id_key";

-- DropIndex
DROP INDEX "Text_mela_id_key";

-- AlterTable
ALTER TABLE "Phrase" DROP COLUMN "mela_id";

-- AlterTable
ALTER TABLE "Text" DROP COLUMN "mela_id";

-- CreateTable
CREATE TABLE "TextContent" (
    "id" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
    "textType" "TextType" NOT NULL,
    "language" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "TextContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TextContent" ADD CONSTRAINT "TextContent_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "Text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

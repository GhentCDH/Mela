/*
  Warnings:

  - You are about to drop the `Lema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Speech` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lema" DROP CONSTRAINT "Lema_speech_id_fkey";

-- DropTable
DROP TABLE "Lema";

-- DropTable
DROP TABLE "Speech";

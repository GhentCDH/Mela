/*
  Warnings:

  - Added the required column `extra_field` to the `phrase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phrase" ADD COLUMN     "extra_field" VARCHAR NOT NULL;

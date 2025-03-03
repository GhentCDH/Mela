/*
  Warnings:

  - You are about to drop the column `example_id` on the `AnnotationBody` table. All the data in the column will be lost.
  - You are about to drop the column `text_content_id` on the `AnnotationBody` table. All the data in the column will be lost.
  - You are about to drop the column `text_content_id` on the `AnnotationTarget` table. All the data in the column will be lost.
  - Added the required column `type_target` to the `AnnotationTarget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_target_id` to the `AnnotationTarget` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnnotationType" AS ENUM ('text_content', 'annotation', 'example');

-- DropForeignKey
ALTER TABLE "AnnotationBody" DROP CONSTRAINT "AnnotationBody_example_id_fkey";

-- DropForeignKey
ALTER TABLE "AnnotationBody" DROP CONSTRAINT "AnnotationBody_text_content_id_fkey";

-- DropForeignKey
ALTER TABLE "AnnotationTarget" DROP CONSTRAINT "AnnotationTarget_text_content_id_fkey";

-- AlterTable
ALTER TABLE "AnnotationBody" DROP COLUMN "example_id",
DROP COLUMN "text_content_id";

-- AlterTable
ALTER TABLE "AnnotationTarget" DROP COLUMN "text_content_id",
ADD COLUMN     "type_target" "AnnotationType" NOT NULL,
ADD COLUMN     "type_target_id" TEXT NOT NULL;

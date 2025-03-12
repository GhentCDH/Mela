/*
  Warnings:

  - You are about to drop the column `body` on the `Annotation` table. All the data in the column will be lost.
  - You are about to drop the column `target` on the `Annotation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Annotation" DROP COLUMN "body",
DROP COLUMN "target";

-- AlterTable
ALTER TABLE "AnnotationBody" ADD COLUMN     "source_id" TEXT,
ADD COLUMN     "source_type" "AnnotationType";

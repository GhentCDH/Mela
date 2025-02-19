/*
  Warnings:

  - You are about to drop the column `target_id` on the `AnnotationBody` table. All the data in the column will be lost.
  - You are about to drop the column `target_id` on the `AnnotationTarget` table. All the data in the column will be lost.
  - Added the required column `source_id` to the `AnnotationTarget` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AnnotationBody" DROP CONSTRAINT "AnnotationBody_target_id_fkey";

-- DropForeignKey
ALTER TABLE "AnnotationTarget" DROP CONSTRAINT "AnnotationTarget_target_id_fkey";

-- AlterTable
ALTER TABLE "AnnotationBody" DROP COLUMN "target_id",
ADD COLUMN     "source_id" TEXT;

-- AlterTable
ALTER TABLE "AnnotationTarget" DROP COLUMN "target_id",
ADD COLUMN     "source_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AnnotationBody" ADD CONSTRAINT "AnnotationBody_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "TextContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnotationTarget" ADD CONSTRAINT "AnnotationTarget_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

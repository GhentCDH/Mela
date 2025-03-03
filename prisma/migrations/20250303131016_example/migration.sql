/*
  Warnings:

  - You are about to drop the column `type_target` on the `AnnotationTarget` table. All the data in the column will be lost.
  - You are about to drop the column `type_target_id` on the `AnnotationTarget` table. All the data in the column will be lost.
  - Added the required column `source_id` to the `AnnotationTarget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_type` to the `AnnotationTarget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnnotationTarget" DROP COLUMN "type_target",
DROP COLUMN "type_target_id",
ADD COLUMN     "source_id" TEXT NOT NULL,
ADD COLUMN     "source_type" "AnnotationType" NOT NULL;

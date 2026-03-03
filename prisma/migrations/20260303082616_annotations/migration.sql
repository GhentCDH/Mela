/*
  Warnings:

  - You are about to drop the column `section_text_id` on the `annotation_new` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "annotation_new" DROP CONSTRAINT "annotation_new_section_text_id_fkey";

-- AlterTable
ALTER TABLE "annotation_new" DROP COLUMN "section_text_id";

-- AlterTable
ALTER TABLE "annotation_text_selector" ADD COLUMN     "section_text_id" TEXT;

-- AddForeignKey
ALTER TABLE "annotation_text_selector" ADD CONSTRAINT "annotation_text_selector_section_text_id_fkey" FOREIGN KEY ("section_text_id") REFERENCES "section_text"("id") ON DELETE SET NULL ON UPDATE CASCADE;

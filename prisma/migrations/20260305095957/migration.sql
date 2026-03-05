-- DropForeignKey
ALTER TABLE "annotation_new" DROP CONSTRAINT "annotation_new_text_selector_id_fkey";

-- AlterTable
ALTER TABLE "annotation_new" ALTER COLUMN "text_selector_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "annotation_new" ADD CONSTRAINT "annotation_new_text_selector_id_fkey" FOREIGN KEY ("text_selector_id") REFERENCES "annotation_text_selector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `text_content_id` to the `Example` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Example" ADD COLUMN     "text_content_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_text_content_id_fkey" FOREIGN KEY ("text_content_id") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

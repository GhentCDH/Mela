/*
  Warnings:

  - You are about to drop the `Phrase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Phrase" DROP CONSTRAINT "Phrase_text_id_fkey";

-- DropTable
DROP TABLE "Phrase";

-- CreateTable
CREATE TABLE "AnnotationBody" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "annotation_id" TEXT NOT NULL,
    "target_id" TEXT,

    CONSTRAINT "AnnotationBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnotationTarget" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "annotation_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,

    CONSTRAINT "AnnotationTarget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnnotationBody" ADD CONSTRAINT "AnnotationBody_annotation_id_fkey" FOREIGN KEY ("annotation_id") REFERENCES "Annotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnotationBody" ADD CONSTRAINT "AnnotationBody_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "TextContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnotationTarget" ADD CONSTRAINT "AnnotationTarget_annotation_id_fkey" FOREIGN KEY ("annotation_id") REFERENCES "Annotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnotationTarget" ADD CONSTRAINT "AnnotationTarget_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

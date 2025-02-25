-- DropForeignKey
ALTER TABLE "AnnotationBody" DROP CONSTRAINT "AnnotationBody_annotation_id_fkey";

-- AddForeignKey
ALTER TABLE "AnnotationBody" ADD CONSTRAINT "AnnotationBody_annotation_id_fkey" FOREIGN KEY ("annotation_id") REFERENCES "Annotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

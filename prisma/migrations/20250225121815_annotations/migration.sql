-- DropForeignKey
ALTER TABLE "AnnotationTarget" DROP CONSTRAINT "AnnotationTarget_annotation_id_fkey";

-- AddForeignKey
ALTER TABLE "AnnotationTarget" ADD CONSTRAINT "AnnotationTarget_annotation_id_fkey" FOREIGN KEY ("annotation_id") REFERENCES "Annotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

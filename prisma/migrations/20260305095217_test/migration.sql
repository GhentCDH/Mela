/*
  Warnings:

  - You are about to drop the `_annotation_relations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_annotation_relations" DROP CONSTRAINT "_annotation_relations_A_fkey";

-- DropForeignKey
ALTER TABLE "_annotation_relations" DROP CONSTRAINT "_annotation_relations_B_fkey";

-- DropTable
DROP TABLE "_annotation_relations";

-- CreateTable
CREATE TABLE "annotation_relation" (
    "annotation_from_id" TEXT NOT NULL,
    "annotation_to_id" TEXT NOT NULL,

    CONSTRAINT "annotation_relation_pkey" PRIMARY KEY ("annotation_from_id","annotation_to_id")
);

-- AddForeignKey
ALTER TABLE "annotation_relation" ADD CONSTRAINT "annotation_relation_annotation_from_id_fkey" FOREIGN KEY ("annotation_from_id") REFERENCES "annotation_new"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_relation" ADD CONSTRAINT "annotation_relation_annotation_to_id_fkey" FOREIGN KEY ("annotation_to_id") REFERENCES "annotation_new"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

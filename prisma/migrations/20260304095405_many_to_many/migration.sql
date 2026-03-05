-- CreateTable
CREATE TABLE "_annotation_relations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_annotation_relations_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_annotation_relations_B_index" ON "_annotation_relations"("B");

-- AddForeignKey
ALTER TABLE "_annotation_relations" ADD CONSTRAINT "_annotation_relations_A_fkey" FOREIGN KEY ("A") REFERENCES "annotation_new"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_annotation_relations" ADD CONSTRAINT "_annotation_relations_B_fkey" FOREIGN KEY ("B") REFERENCES "annotation_new"("id") ON DELETE CASCADE ON UPDATE CASCADE;

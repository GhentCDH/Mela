-- CreateTable
CREATE TABLE "_example_lema" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_example_lema_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_example_lema_B_index" ON "_example_lema"("B");

-- AddForeignKey
ALTER TABLE "_example_lema" ADD CONSTRAINT "_example_lema_A_fkey" FOREIGN KEY ("A") REFERENCES "example"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_example_lema" ADD CONSTRAINT "_example_lema_B_fkey" FOREIGN KEY ("B") REFERENCES "lema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

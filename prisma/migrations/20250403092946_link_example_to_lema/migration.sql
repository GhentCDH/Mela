-- CreateTable
CREATE TABLE "_example_lemma"
(
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_example_lemma_AB_pkey" PRIMARY KEY ("A", "B")
);

-- CreateIndex
CREATE INDEX "_example_lemma_B_index" ON "_example_lemma" ("B");

-- AddForeignKey
ALTER TABLE "_example_lemma"
    ADD CONSTRAINT "_example_lemma_A_fkey" FOREIGN KEY ("A") REFERENCES "example" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_example_lemma"
    ADD CONSTRAINT "_example_lemma_B_fkey" FOREIGN KEY ("B") REFERENCES "lemma" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

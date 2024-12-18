-- CreateTable
CREATE TABLE "Phrase" (
    "id" TEXT NOT NULL,
    "mela_id" TEXT NOT NULL,
    "book_nbr" TEXT NOT NULL,
    "chapter_nbr" TEXT NOT NULL,
    "phrase_nbr" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
    "source_text" TEXT NOT NULL,
    "translation" TEXT NOT NULL,

    CONSTRAINT "Phrase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Phrase_mela_id_key" ON "Phrase"("mela_id");

-- AddForeignKey
ALTER TABLE "Phrase" ADD CONSTRAINT "Phrase_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "Text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

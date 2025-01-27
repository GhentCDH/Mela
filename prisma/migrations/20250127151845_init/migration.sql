-- CreateEnum
CREATE TYPE "TextType" AS ENUM ('SOURCE', 'TRANSLATION');

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Text" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextContent" (
    "id" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
    "text_type" "TextType" NOT NULL,
    "language" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "TextContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phrase" (
    "id" TEXT NOT NULL,
    "book_nbr" TEXT NOT NULL,
    "chapter_nbr" TEXT NOT NULL,
    "phrase_nbr" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
    "source_text" TEXT NOT NULL,
    "translation" TEXT,

    CONSTRAINT "Phrase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Register" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speech" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Speech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lema" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "grammatical" BOOLEAN DEFAULT false,
    "comparative" BOOLEAN DEFAULT false,
    "superlative" BOOLEAN DEFAULT false,
    "participle" BOOLEAN DEFAULT false,
    "speech_id" TEXT NOT NULL,

    CONSTRAINT "Lema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Register_name_key" ON "Register"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Speech_name_key" ON "Speech"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lema_word_key" ON "Lema"("word");

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextContent" ADD CONSTRAINT "TextContent_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "Text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phrase" ADD CONSTRAINT "Phrase_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "Text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lema" ADD CONSTRAINT "Lema_speech_id_fkey" FOREIGN KEY ("speech_id") REFERENCES "Speech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

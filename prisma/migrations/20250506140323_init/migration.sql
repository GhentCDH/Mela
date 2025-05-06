-- CreateEnum
CREATE TYPE "TextType" AS ENUM ('SOURCE', 'TRANSLATION');

-- CreateEnum
CREATE TYPE "MotivationEnum" AS ENUM ('classifying', 'tagging');

-- CreateEnum
CREATE TYPE "AnnotationType" AS ENUM ('text_content', 'annotation', 'example', 'lemma');

-- CreateTable
CREATE TABLE "author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter" (
    "id" TEXT NOT NULL,
    "chapter_number" TEXT,
    "order" INTEGER,
    "name" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chapter_id" TEXT NOT NULL,

    CONSTRAINT "text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_content" (
    "id" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
    "text_type" "TextType" NOT NULL,
    "language" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "text_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation" (
    "id" TEXT NOT NULL,
    "motivation" "MotivationEnum" NOT NULL,
    "text_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_body" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "annotation_id" TEXT NOT NULL,
    "source_type" "AnnotationType",
    "source_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annotation_body_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_target" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "annotation_id" TEXT NOT NULL,
    "source_type" "AnnotationType" NOT NULL,
    "source_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annotation_target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "register_id" TEXT NOT NULL,
    "text_content_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "register" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speech" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lemma" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "grammatical" BOOLEAN DEFAULT false,
    "comparative" BOOLEAN DEFAULT false,
    "superlative" BOOLEAN DEFAULT false,
    "participle" BOOLEAN DEFAULT false,
    "speech_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lemma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_example_lemma" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_example_lemma_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "author_name_key" ON "author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "register_name_key" ON "register"("name");

-- CreateIndex
CREATE UNIQUE INDEX "speech_name_key" ON "speech"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lemma_word_key" ON "lemma"("word");

-- CreateIndex
CREATE INDEX "_example_lemma_B_index" ON "_example_lemma"("B");

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text" ADD CONSTRAINT "text_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_content" ADD CONSTRAINT "text_content_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation" ADD CONSTRAINT "annotation_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_body" ADD CONSTRAINT "annotation_body_annotation_id_fkey" FOREIGN KEY ("annotation_id") REFERENCES "annotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_target" ADD CONSTRAINT "annotation_target_annotation_id_fkey" FOREIGN KEY ("annotation_id") REFERENCES "annotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example" ADD CONSTRAINT "example_register_id_fkey" FOREIGN KEY ("register_id") REFERENCES "register"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example" ADD CONSTRAINT "example_text_content_id_fkey" FOREIGN KEY ("text_content_id") REFERENCES "text_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lemma" ADD CONSTRAINT "lemma_speech_id_fkey" FOREIGN KEY ("speech_id") REFERENCES "speech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_example_lemma" ADD CONSTRAINT "_example_lemma_A_fkey" FOREIGN KEY ("A") REFERENCES "example"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_example_lemma" ADD CONSTRAINT "_example_lemma_B_fkey" FOREIGN KEY ("B") REFERENCES "lemma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

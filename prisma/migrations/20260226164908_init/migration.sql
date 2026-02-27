-- CreateEnum
CREATE TYPE "TextType" AS ENUM ('SOURCE', 'TRANSLATION');

-- CreateEnum
CREATE TYPE "MotivationEnum" AS ENUM ('classifying', 'tagging');

-- CreateEnum
CREATE TYPE "AnnotationType" AS ENUM ('text_translation', 'annotation', 'example', 'lemma');

-- CreateTable
CREATE TABLE "author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section" (
    "id" TEXT NOT NULL,
    "section_number" TEXT,
    "section_order" INTEGER,
    "title" TEXT,
    "work_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_text" (
    "id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    "text_type" "TextType" NOT NULL,
    "language" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "section_text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation" (
    "id" TEXT NOT NULL,
    "motivation" "MotivationEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_body" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "annotation_id" TEXT NOT NULL,
    "source_type" "AnnotationType",
    "source_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annotation_body_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_target" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "annotation_id" TEXT NOT NULL,
    "source_type" "AnnotationType" NOT NULL,
    "source_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annotation_target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "register_id" TEXT NOT NULL,
    "section_text_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "register" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speech" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
ALTER TABLE "work" ADD CONSTRAINT "work_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_text" ADD CONSTRAINT "section_text_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_body" ADD CONSTRAINT "annotation_body_annotation_id_fkey" FOREIGN KEY ("annotation_id") REFERENCES "annotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_target" ADD CONSTRAINT "annotation_target_annotation_id_fkey" FOREIGN KEY ("annotation_id") REFERENCES "annotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example" ADD CONSTRAINT "example_register_id_fkey" FOREIGN KEY ("register_id") REFERENCES "register"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example" ADD CONSTRAINT "example_section_text_id_fkey" FOREIGN KEY ("section_text_id") REFERENCES "section_text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lemma" ADD CONSTRAINT "lemma_speech_id_fkey" FOREIGN KEY ("speech_id") REFERENCES "speech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_example_lemma" ADD CONSTRAINT "_example_lemma_A_fkey" FOREIGN KEY ("A") REFERENCES "example"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_example_lemma" ADD CONSTRAINT "_example_lemma_B_fkey" FOREIGN KEY ("B") REFERENCES "lemma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

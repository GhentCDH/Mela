-- CreateEnum
CREATE TYPE "TextType" AS ENUM ('SOURCE', 'TRANSLATION');

-- CreateEnum
CREATE TYPE "MotivationEnum" AS ENUM ('classifying', 'tagging');

-- CreateEnum
CREATE TYPE "AnnotationType" AS ENUM ('text_content', 'annotation', 'example');

-- CreateTable
CREATE TABLE "author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_content" (
    "id" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
    "text_type" "TextType" NOT NULL,
    "language" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "text_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation" (
    "id" TEXT NOT NULL,
    "motivation" "MotivationEnum" NOT NULL,
    "text_id" TEXT NOT NULL,

    CONSTRAINT "annotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_body" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "annotation_id" TEXT NOT NULL,
    "source_type" "AnnotationType",
    "source_id" TEXT,

    CONSTRAINT "annotation_body_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_target" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "annotation_id" TEXT NOT NULL,
    "source_type" "AnnotationType" NOT NULL,
    "source_id" TEXT NOT NULL,

    CONSTRAINT "annotation_target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "register_id" TEXT NOT NULL,
    "text_content_id" TEXT NOT NULL,

    CONSTRAINT "example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "register" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speech" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "speech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lema" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "grammatical" BOOLEAN DEFAULT false,
    "comparative" BOOLEAN DEFAULT false,
    "superlative" BOOLEAN DEFAULT false,
    "participle" BOOLEAN DEFAULT false,
    "speech_id" TEXT NOT NULL,

    CONSTRAINT "lema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "author_name_key" ON "author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "register_name_key" ON "register"("name");

-- CreateIndex
CREATE UNIQUE INDEX "speech_name_key" ON "speech"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lema_word_key" ON "lema"("word");

-- AddForeignKey
ALTER TABLE "text" ADD CONSTRAINT "text_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "lema" ADD CONSTRAINT "lema_speech_id_fkey" FOREIGN KEY ("speech_id") REFERENCES "speech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "MotivationEnum" AS ENUM ('classifying', 'tagging');

-- CreateTable
CREATE TABLE "Annotation" (
    "is" TEXT NOT NULL,
    "body" JSONB NOT NULL,
    "target" JSONB NOT NULL,
    "motivation" "MotivationEnum" NOT NULL,
    "text_id" TEXT NOT NULL,

    CONSTRAINT "Annotation_pkey" PRIMARY KEY ("is")
);

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "Text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

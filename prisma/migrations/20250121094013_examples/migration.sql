-- CreateEnum
CREATE TYPE "GrammaticalTopicType" AS ENUM ('specific', 'overarching');

-- CreateTable
CREATE TABLE "GrammaticalTopic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GrammaticalTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SemanticTopic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SemanticTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "mela_id" TEXT NOT NULL,
    "register_id" TEXT NOT NULL,
    "semantic_topic_id" TEXT NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedExample" (
    "id" TEXT NOT NULL,
    "example_id" TEXT NOT NULL,
    "related_example_id" TEXT NOT NULL,
    "importance" INTEGER NOT NULL,

    CONSTRAINT "RelatedExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExampleParallelPassage" (
    "id" TEXT NOT NULL,
    "example_id" TEXT NOT NULL,
    "passage" TEXT NOT NULL,

    CONSTRAINT "ExampleParallelPassage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExampleGrammaticalTopic" (
    "id" TEXT NOT NULL,
    "type" "GrammaticalTopicType" NOT NULL,
    "example_id" TEXT NOT NULL,
    "grammatical_topic_id" TEXT NOT NULL,

    CONSTRAINT "ExampleGrammaticalTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExampleLema" (
    "id" TEXT NOT NULL,
    "example_id" TEXT NOT NULL,
    "lema_id" TEXT NOT NULL,
    "importance" INTEGER NOT NULL,

    CONSTRAINT "ExampleLema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GrammaticalTopic_name_key" ON "GrammaticalTopic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SemanticTopic_name_key" ON "SemanticTopic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Example_mela_id_key" ON "Example"("mela_id");

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_register_id_fkey" FOREIGN KEY ("register_id") REFERENCES "Register"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_semantic_topic_id_fkey" FOREIGN KEY ("semantic_topic_id") REFERENCES "SemanticTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedExample" ADD CONSTRAINT "RelatedExample_example_id_fkey" FOREIGN KEY ("example_id") REFERENCES "Example"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedExample" ADD CONSTRAINT "RelatedExample_related_example_id_fkey" FOREIGN KEY ("related_example_id") REFERENCES "Example"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExampleParallelPassage" ADD CONSTRAINT "ExampleParallelPassage_example_id_fkey" FOREIGN KEY ("example_id") REFERENCES "Example"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExampleGrammaticalTopic" ADD CONSTRAINT "ExampleGrammaticalTopic_example_id_fkey" FOREIGN KEY ("example_id") REFERENCES "Example"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExampleGrammaticalTopic" ADD CONSTRAINT "ExampleGrammaticalTopic_grammatical_topic_id_fkey" FOREIGN KEY ("grammatical_topic_id") REFERENCES "GrammaticalTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExampleLema" ADD CONSTRAINT "ExampleLema_example_id_fkey" FOREIGN KEY ("example_id") REFERENCES "Example"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExampleLema" ADD CONSTRAINT "ExampleLema_lema_id_fkey" FOREIGN KEY ("lema_id") REFERENCES "Lema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

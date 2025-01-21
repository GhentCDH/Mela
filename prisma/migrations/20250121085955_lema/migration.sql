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
CREATE UNIQUE INDEX "Speech_name_key" ON "Speech"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lema_word_key" ON "Lema"("word");

-- AddForeignKey
ALTER TABLE "Lema" ADD CONSTRAINT "Lema_speech_id_fkey" FOREIGN KEY ("speech_id") REFERENCES "Speech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

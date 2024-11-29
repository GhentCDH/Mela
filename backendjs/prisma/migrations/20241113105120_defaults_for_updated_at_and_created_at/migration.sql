-- CreateTable
CREATE TABLE "author" (
    "name" VARCHAR NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "pk_author" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edition" (
    "author_id" BIGINT,
    "name" VARCHAR NOT NULL,
    "year" INTEGER NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "pk_edition" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edition__manuscript" (
    "manuscript_id" BIGINT NOT NULL,
    "edition_id" BIGINT NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "pk_edition__manuscript" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manuscript" (
    "name" VARCHAR NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "pk_manuscript" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phrase" (
    "edition_id" BIGINT,
    "phrase_order" INTEGER NOT NULL,
    "mela_identifier" VARCHAR NOT NULL,
    "external_identifier" VARCHAR NOT NULL,
    "content" VARCHAR NOT NULL,
    "translation" VARCHAR NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "pk_phrase" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "register" (
    "name" VARCHAR NOT NULL,
    "id" BIGSERIAL NOT NULL,

    CONSTRAINT "pk_register" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "edition" ADD CONSTRAINT "fk_edition_author_id_author" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "edition__manuscript" ADD CONSTRAINT "fk_edition__manuscript_edition_id_edition" FOREIGN KEY ("edition_id") REFERENCES "edition"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "edition__manuscript" ADD CONSTRAINT "fk_edition__manuscript_manuscript_id_manuscript" FOREIGN KEY ("manuscript_id") REFERENCES "manuscript"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "phrase" ADD CONSTRAINT "fk_phrase_edition_id_edition" FOREIGN KEY ("edition_id") REFERENCES "edition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

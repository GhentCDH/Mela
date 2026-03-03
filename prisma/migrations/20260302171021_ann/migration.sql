-- CreateTable
CREATE TABLE "annotation_def" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "json_schema" JSONB,
    "ui_schema" JSONB,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annotation_def_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_new" (
    "id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "text_selector_id" TEXT NOT NULL,
    "section_text_id" TEXT,
    "value" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annotation_new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_text_selector" (
    "id" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "prefix" TEXT NOT NULL,
    "suffix" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annotation_text_selector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "annotation_def_name_key" ON "annotation_def"("name");

-- AddForeignKey
ALTER TABLE "annotation_new" ADD CONSTRAINT "annotation_new_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "annotation_def"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_new" ADD CONSTRAINT "annotation_new_text_selector_id_fkey" FOREIGN KEY ("text_selector_id") REFERENCES "annotation_text_selector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_new" ADD CONSTRAINT "annotation_new_section_text_id_fkey" FOREIGN KEY ("section_text_id") REFERENCES "section_text"("id") ON DELETE SET NULL ON UPDATE CASCADE;

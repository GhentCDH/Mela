-- AlterTable
ALTER TABLE "AnnotationBody" ADD COLUMN     "example_id" TEXT;

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "register_id" TEXT NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnnotationBody" ADD CONSTRAINT "AnnotationBody_example_id_fkey" FOREIGN KEY ("example_id") REFERENCES "Example"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_register_id_fkey" FOREIGN KEY ("register_id") REFERENCES "Register"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `createdAt` on the `annotation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `annotation` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `annotation_body` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `annotation_body` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `annotation_target` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `annotation_target` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `author` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `author` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `example` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `example` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `lemma` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `lemma` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `register` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `register` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `speech` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `speech` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `text` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `text` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `text_content` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `text_content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "annotation" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "annotation_body" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "annotation_target" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "author" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "book" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "chapter" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "example" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "lemma" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "register" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "speech" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "text" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "text_content" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

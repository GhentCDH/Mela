-- CreateTable
CREATE TABLE "location" (
    "id" BIGSERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "pk_location" PRIMARY KEY ("id")
);

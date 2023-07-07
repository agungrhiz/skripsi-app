-- CreateEnum
CREATE TYPE "upload_types" AS ENUM ('IMAGE', 'VIDEO', 'OTHER');

-- CreateTable
CREATE TABLE "uploads" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" "upload_types" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uploads_pkey" PRIMARY KEY ("id")
);

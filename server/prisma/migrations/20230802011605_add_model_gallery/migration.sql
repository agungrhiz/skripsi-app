-- CreateTable
CREATE TABLE "galleries" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "fk_upload_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "galleries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_fk_upload_id_fkey" FOREIGN KEY ("fk_upload_id") REFERENCES "uploads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

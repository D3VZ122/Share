-- CreateTable
CREATE TABLE "sharedata" (
    "id" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filenames" TEXT NOT NULL,
    "deleteat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sharedata_pkey" PRIMARY KEY ("id")
);

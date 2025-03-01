-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "adopted" BOOLEAN NOT NULL DEFAULT false,
    "intakeDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outakeDate" TIMESTAMP(3),
    "description" TEXT,
    "medicalInfo" TEXT,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

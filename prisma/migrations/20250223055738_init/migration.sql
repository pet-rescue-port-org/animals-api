-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "adoptionStatus" TEXT NOT NULL,
    "intakeDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outakeDate" DATETIME,
    "description" TEXT,
    "medicalInfo" TEXT
);

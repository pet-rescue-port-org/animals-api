/*
  Warnings:

  - You are about to drop the column `adoptionStatus` on the `Animal` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "adopted" BOOLEAN NOT NULL DEFAULT false,
    "intakeDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outakeDate" DATETIME,
    "description" TEXT,
    "medicalInfo" TEXT
);
INSERT INTO "new_Animal" ("description", "id", "intakeDate", "location", "medicalInfo", "name", "outakeDate", "species") SELECT "description", "id", "intakeDate", "location", "medicalInfo", "name", "outakeDate", "species" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to alter the column `nPerSalary` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `Decimal(6,2)` to `Real`.
  - Made the column `cPerSexo` on table `Person` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "nPerSalary" SET DATA TYPE REAL,
ALTER COLUMN "cPerSexo" SET NOT NULL;

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "mailSubject" VARCHAR(50) NOT NULL,
    "mailMessage" VARCHAR(255) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

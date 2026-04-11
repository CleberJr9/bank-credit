/*
  Warnings:

  - Made the column `usedCents` on table `card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "card" ALTER COLUMN "usedCents" SET NOT NULL,
ALTER COLUMN "usedCents" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

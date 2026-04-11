/*
  Warnings:

  - Added the required column `usedCents` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "statusTransaction" ADD VALUE 'REFUNDED';

-- AlterTable
ALTER TABLE "card" ADD COLUMN     "usedCents" INTEGER NOT NULL;

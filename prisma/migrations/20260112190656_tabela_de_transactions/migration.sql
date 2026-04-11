/*
  Warnings:

  - Added the required column `availableLimitCents` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "statusTransaction" AS ENUM ('APPROVED', 'DECLINED');

-- AlterTable
ALTER TABLE "card" ADD COLUMN     "availableLimitCents" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "merchant" TEXT NOT NULL,
    "declineReason" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "status" "statusTransaction" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "transactions_cardId_idx" ON "transactions"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_cardId_idempotencyKey_key" ON "transactions"("cardId", "idempotencyKey");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

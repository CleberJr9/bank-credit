-- CreateEnum
CREATE TYPE "transactionType" AS ENUM ('PAYMENT', 'REVERSAL');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "originalTransactionId" TEXT,
ADD COLUMN     "type" "transactionType" NOT NULL DEFAULT 'PAYMENT';

-- CreateIndex
CREATE INDEX "transactions_originalTransactionId_idx" ON "transactions"("originalTransactionId");

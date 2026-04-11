/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "cardStatus" AS ENUM ('BLOCKED', 'ACTIVE');

-- AlterTable
ALTER TABLE "customer" DROP CONSTRAINT "customer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "customer_id_seq";

-- CreateTable
CREATE TABLE "card" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "limitCents" INTEGER NOT NULL,
    "status" "cardStatus" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "card_customerId_idx" ON "card"("customerId");

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

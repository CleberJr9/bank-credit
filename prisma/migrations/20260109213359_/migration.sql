/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "phone" TEXT NOT NULL DEFAULT 'phone default';

-- CreateIndex
CREATE UNIQUE INDEX "customer_phone_key" ON "customer"("phone");

/*
  Warnings:

  - You are about to drop the column `phone` on the `customer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "customer_phone_key";

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "phone";

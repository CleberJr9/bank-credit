/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `card` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "card_id_key" ON "card"("id");

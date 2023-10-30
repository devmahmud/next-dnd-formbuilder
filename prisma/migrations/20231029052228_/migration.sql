/*
  Warnings:

  - A unique constraint covering the columns `[shareURL]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Form_shareURL_key" ON "Form"("shareURL");

/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Movie_externalId_key` ON `Movie`(`externalId`);

/*
  Warnings:

  - A unique constraint covering the columns `[accessToken]` on the table `TokenSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TokenSession_accessToken_key` ON `TokenSession`(`accessToken`);

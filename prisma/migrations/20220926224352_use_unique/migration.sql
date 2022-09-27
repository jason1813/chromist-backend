/*
  Warnings:

  - A unique constraint covering the columns `[userId,threadId]` on the table `threadvotes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "threadvotes_userId_threadId_key" ON "threadvotes"("userId", "threadId");

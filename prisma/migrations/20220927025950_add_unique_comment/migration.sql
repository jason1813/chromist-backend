/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `commentvotes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "commentvotes_userId_commentId_key" ON "commentvotes"("userId", "commentId");

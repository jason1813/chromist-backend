-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_threadId_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "threadId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

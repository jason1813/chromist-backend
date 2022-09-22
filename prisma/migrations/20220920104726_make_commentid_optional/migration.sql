-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_commentId_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "commentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

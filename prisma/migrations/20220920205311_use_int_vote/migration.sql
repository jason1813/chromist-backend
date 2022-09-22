/*
  Warnings:

  - Changed the type of `vote` on the `commentvotes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vote` on the `threadvotes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "commentvotes" DROP COLUMN "vote",
ADD COLUMN     "vote" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "threadvotes" DROP COLUMN "vote",
ADD COLUMN     "vote" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "VoteStatus";

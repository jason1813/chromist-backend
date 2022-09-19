/*
  Warnings:

  - The values [Up,Down] on the enum `VoteStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VoteStatus_new" AS ENUM ('up', 'down');
ALTER TABLE "commentvotes" ALTER COLUMN "vote" TYPE "VoteStatus_new" USING ("vote"::text::"VoteStatus_new");
ALTER TABLE "threadvotes" ALTER COLUMN "vote" TYPE "VoteStatus_new" USING ("vote"::text::"VoteStatus_new");
ALTER TYPE "VoteStatus" RENAME TO "VoteStatus_old";
ALTER TYPE "VoteStatus_new" RENAME TO "VoteStatus";
DROP TYPE "VoteStatus_old";
COMMIT;

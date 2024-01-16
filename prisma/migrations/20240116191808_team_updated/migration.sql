/*
  Warnings:

  - The `lastClueRound2` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `lastClueSherlock` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `lastClueWatson` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "lastClueRound2",
ADD COLUMN     "lastClueRound2" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "lastClueSherlock",
ADD COLUMN     "lastClueSherlock" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "lastClueWatson",
ADD COLUMN     "lastClueWatson" INTEGER NOT NULL DEFAULT 0;

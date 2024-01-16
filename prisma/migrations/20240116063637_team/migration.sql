/*
  Warnings:

  - Added the required column `lastClueRound2` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastClueSherlock` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastClueWatson` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "cluesUsedBySherlock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cluesUsedByWatson" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cluesUsedInRound2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastClueRound2" TEXT NOT NULL,
ADD COLUMN     "lastClueSherlock" TEXT NOT NULL,
ADD COLUMN     "lastClueWatson" TEXT NOT NULL,
ADD COLUMN     "round2EndTime" TIMESTAMP(3),
ADD COLUMN     "round2Score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "round2StartTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sherlockEndTime" TIMESTAMP(3),
ADD COLUMN     "sherlockScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sherlockStartTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "teamScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "watsonEndTime" TIMESTAMP(3),
ADD COLUMN     "watsonScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "watsonStartTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

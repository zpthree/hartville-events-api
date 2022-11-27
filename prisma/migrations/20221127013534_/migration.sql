/*
  Warnings:

  - You are about to drop the column `source` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Post` table. All the data in the column will be lost.
  - Added the required column `sourceId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Source` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Source` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "source",
ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "source",
ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "eventId" INTEGER NOT NULL,
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

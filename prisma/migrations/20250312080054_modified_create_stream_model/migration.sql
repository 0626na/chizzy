/*
  Warnings:

  - A unique constraint covering the columns `[streamId]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stream_streamId_key" ON "Stream"("streamId");

/*
  Warnings:

  - You are about to drop the column `birthdate` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `birthdate`,
    DROP COLUMN `department`;

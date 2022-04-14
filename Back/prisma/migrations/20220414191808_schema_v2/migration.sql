/*
  Warnings:

  - Added the required column `post_title` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `post_title` VARCHAR(50) NOT NULL;

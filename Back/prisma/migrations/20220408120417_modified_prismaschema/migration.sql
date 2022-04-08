/*
  Warnings:

  - You are about to drop the column `message` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `post` table. All the data in the column will be lost.
  - Added the required column `message_text` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_text` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `message`,
    ADD COLUMN `message_text` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `message`,
    ADD COLUMN `post_text` VARCHAR(255) NOT NULL;

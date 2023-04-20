/*
  Warnings:

  - You are about to drop the column `instragram` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `instragram`,
    ADD COLUMN `instagram` VARCHAR(191) NULL;

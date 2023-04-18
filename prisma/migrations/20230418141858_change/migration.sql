/*
  Warnings:

  - You are about to drop the column `employerId` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the `candidates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `jobs_employerId_key` ON `jobs`;

-- AlterTable
ALTER TABLE `jobs` DROP COLUMN `employerId`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `candidates`;

-- DropTable
DROP TABLE `employers`;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `jobs_userId_key` ON `jobs`(`userId`);

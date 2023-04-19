-- DropIndex
DROP INDEX `jobs_userId_key` ON `jobs`;

-- CreateIndex
CREATE INDEX `jobs_userId_idx` ON `jobs`(`userId`);

/*
  Warnings:

  - Added the required column `file_path` to the `FileRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FileRecord` ADD COLUMN `file_path` VARCHAR(500) NOT NULL;

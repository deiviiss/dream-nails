-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" DROP DEFAULT;

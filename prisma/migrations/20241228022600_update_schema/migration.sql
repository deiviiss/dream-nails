/*
  Warnings:

  - You are about to drop the column `category_id` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `incomes` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expense_category_id` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_id` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income_category_id` to the `incomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_id` to the `incomes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('debit', 'cash');

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_category_id_fkey";

-- DropForeignKey
ALTER TABLE "incomes" DROP CONSTRAINT "incomes_category_id_fkey";

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "category_id",
ADD COLUMN     "expense_category_id" INTEGER NOT NULL,
ADD COLUMN     "wallet_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "category_id",
ADD COLUMN     "income_category_id" INTEGER NOT NULL,
ADD COLUMN     "wallet_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "expense_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "expense_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "income_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "income_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "type" "WalletType" NOT NULL DEFAULT 'debit',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_expense_category_id_fkey" FOREIGN KEY ("expense_category_id") REFERENCES "expense_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_income_category_id_fkey" FOREIGN KEY ("income_category_id") REFERENCES "income_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

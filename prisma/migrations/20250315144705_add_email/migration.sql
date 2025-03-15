/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Inquiry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Inquiry_email_key" ON "Inquiry"("email");

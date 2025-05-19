-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'COMPLETED', 'REJECTED');

-- CreateEnum
CREATE TYPE "FormType" AS ENUM ('SOCIAL_AID', 'LOAN_REQUEST', 'KOL_JOIN', 'GALA', 'DONATION', 'OTHER');

-- CreateTable
CREATE TABLE "FormRequest" (
    "id" TEXT NOT NULL,
    "formType" "FormType" NOT NULL DEFAULT 'OTHER',
    "formData" JSONB NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "metadata" JSONB,
    "createdBy" TEXT,
    "assignedTo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FormRequest_formType_idx" ON "FormRequest"("formType");

-- CreateIndex
CREATE INDEX "FormRequest_status_idx" ON "FormRequest"("status");

-- CreateIndex
CREATE INDEX "FormRequest_createdAt_idx" ON "FormRequest"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- AddForeignKey
ALTER TABLE "FormRequest" ADD CONSTRAINT "FormRequest_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "AdminUser"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormRequest" ADD CONSTRAINT "FormRequest_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "AdminUser"("email") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - The values [GALA] on the enum `FormType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FormType_new" AS ENUM ('SOCIAL_AID', 'LOAN_REQUEST', 'KOL_JOIN', 'GALA_REGISTRATION', 'DONATION', 'OTHER');
ALTER TABLE "FormRequest" ALTER COLUMN "formType" DROP DEFAULT;
ALTER TABLE "FormRequest" ALTER COLUMN "formType" TYPE "FormType_new" USING ("formType"::text::"FormType_new");
ALTER TYPE "FormType" RENAME TO "FormType_old";
ALTER TYPE "FormType_new" RENAME TO "FormType";
DROP TYPE "FormType_old";
ALTER TABLE "FormRequest" ALTER COLUMN "formType" SET DEFAULT 'OTHER';
COMMIT;

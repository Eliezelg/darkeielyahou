-- AlterEnum
-- Remove KOL_JOIN from FormType enum
-- This requires recreating the enum in PostgreSQL

-- Create new enum without KOL_JOIN
CREATE TYPE "FormType_new" AS ENUM ('SOCIAL_AID', 'LOAN_REQUEST', 'GALA', 'DONATION', 'OTHER');

-- Update existing records that have KOL_JOIN to OTHER
UPDATE "FormRequest" SET "formType" = 'OTHER' WHERE "formType" = 'KOL_JOIN';

-- Remove the default value temporarily
ALTER TABLE "FormRequest" ALTER COLUMN "formType" DROP DEFAULT;

-- Alter the column to use the new enum
ALTER TABLE "FormRequest" ALTER COLUMN "formType" TYPE "FormType_new" USING ("formType"::text::"FormType_new");

-- Drop the old enum
DROP TYPE "FormType";

-- Rename the new enum to the original name
ALTER TYPE "FormType_new" RENAME TO "FormType";

-- Re-add the default value with the new enum type
ALTER TABLE "FormRequest" ALTER COLUMN "formType" SET DEFAULT 'OTHER'::"FormType";
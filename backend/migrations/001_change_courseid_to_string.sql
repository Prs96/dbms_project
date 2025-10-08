-- Migration to change CourseID from INTEGER to VARCHAR
-- Run this SQL on your PostgreSQL database

-- Change CourseID column type from INTEGER to VARCHAR
ALTER TABLE "Users" 
ALTER COLUMN "CourseID" TYPE VARCHAR(50) USING "CourseID"::VARCHAR;

-- Update any NULL values if needed (optional)
-- UPDATE "Users" SET "CourseID" = NULL WHERE "CourseID" = '';

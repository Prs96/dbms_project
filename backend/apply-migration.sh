#!/bin/bash

# Migration Script: Change CourseID to String
# This script updates the database schema to support text-based course IDs

echo "🔧 Applying database migration: Change CourseID to VARCHAR..."

# Run the migration SQL file
docker compose exec -T postgres psql -U postgres -d dbmsS5 < ./migrations/001_change_courseid_to_string.sql

if [ $? -eq 0 ]; then
    echo "✅ Migration completed successfully!"
    echo "CourseID column is now VARCHAR and can accept values like 'TVE23CS131'"
else
    echo "❌ Migration failed. Please check the error above."
    exit 1
fi

echo ""
echo "🔄 Restarting backend to apply model changes..."
docker compose restart backend

echo ""
echo "✅ Done! You can now use text-based Course IDs."

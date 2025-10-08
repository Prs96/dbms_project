# Migration Script: Change CourseID to String
# This script updates the database schema to support text-based course IDs

Write-Host "🔧 Applying database migration: Change CourseID to VARCHAR..." -ForegroundColor Cyan

# Run the migration SQL file
Get-Content .\migrations\001_change_courseid_to_string.sql | docker compose exec -T postgres psql -U postgres -d dbmsS5

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Migration completed successfully!" -ForegroundColor Green
    Write-Host "CourseID column is now VARCHAR and can accept values like 'TVE23CS131'" -ForegroundColor Green
} else {
    Write-Host "❌ Migration failed. Please check the error above." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔄 Restarting backend to apply model changes..." -ForegroundColor Cyan
docker compose restart backend

Write-Host ""
Write-Host "✅ Done! You can now use text-based Course IDs." -ForegroundColor Green

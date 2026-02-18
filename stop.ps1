# Stop all services
Write-Host "🛑 Stopping all services..." -ForegroundColor Yellow
docker-compose down
docker-compose -f docker-compose.prod.yml down
Write-Host "✅ All services stopped" -ForegroundColor Green

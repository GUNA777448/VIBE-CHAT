# Production Scripts
Write-Host "🚀 Starting VIBE-CHAT in Production Mode..." -ForegroundColor Green
docker-compose -f docker-compose.prod.yml up --build -d
Write-Host "`n✅ Services started successfully!" -ForegroundColor Green
Write-Host "`n📊 To view logs: docker-compose -f docker-compose.prod.yml logs -f" -ForegroundColor Yellow
Write-Host "🌐 Frontend: http://localhost:80" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:5000" -ForegroundColor Cyan

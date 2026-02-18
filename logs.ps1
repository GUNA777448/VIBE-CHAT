# View logs for all services
param(
    [string]$Service = ""
)

if ($Service) {
    Write-Host "📋 Viewing logs for: $Service" -ForegroundColor Cyan
    docker-compose logs -f $Service
} else {
    Write-Host "📋 Viewing logs for all services..." -ForegroundColor Cyan
    docker-compose logs -f
}
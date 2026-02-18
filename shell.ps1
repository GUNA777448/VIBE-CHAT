# Interactive shell access
param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("server", "client", "mongodb")]
    [string]$Service
)

$containerName = switch ($Service) {
    "server" { "vibe-chat-server" }
    "client" { "vibe-chat-client" }
    "mongodb" { "vibe-chat-mongodb" }
}

Write-Host "🔌 Connecting to $Service container..." -ForegroundColor Cyan

if ($Service -eq "mongodb") {
    docker exec -it $containerName mongosh -u admin -p password --authenticationDatabase admin
} else {
    docker exec -it $containerName sh
}

# ARTISAN AI - CLI Initialization Script
# Loads environment variables for Gemini CLI

$envFile = "$PSScriptRoot\.env"

if (Test-Path $envFile) {
    $lines = Get-Content $envFile
    foreach ($line in $lines) {
        if ($line -match "^GEMINI_CLI_KEY=(.*)$") {
            $env:GEMINI_API_KEY = $matches[1].Trim()
            Write-Host "✅ Gemini CLI keys loaded from .env" -ForegroundColor Green
            Write-Host "🚀 You can now use 'gemini' command with dedicated quota." -ForegroundColor Cyan
            break
        }
    }
}
else {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
}

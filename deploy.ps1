# LIDKHA Firebase Deployment Script (PowerShell)
# This script automates the build and deployment process

Write-Host "🚀 LIDKHA Deployment Script" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""

# Build the React app
Write-Host "📦 Building React app..." -ForegroundColor Cyan
Push-Location client
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please fix errors and try again." -ForegroundColor Red
    exit 1
}

# Go back to root directory
Pop-Location

# Deploy to Firebase
Write-Host ""
Write-Host "📤 Deploying to Firebase..." -ForegroundColor Cyan
firebase deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌍 Your app is now live at:" -ForegroundColor Green
    Write-Host "   Production: https://lidkha.com.ng" -ForegroundColor Yellow
    Write-Host "   Firebase: https://lidkha-learning-platform.web.app" -ForegroundColor Yellow
} else {
    Write-Host "❌ Deployment failed." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✨ Deployment complete!" -ForegroundColor Green

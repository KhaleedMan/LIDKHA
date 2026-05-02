#!/bin/bash
# LIDKHA Firebase Deployment Script
# This script automates the build and deployment process

echo "🚀 LIDKHA Deployment Script"
echo "=================================="
echo ""

# Build the React app
echo "📦 Building React app..."
cd client
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

# Go back to root directory
cd ..

# Deploy to Firebase
echo ""
echo "📤 Deploying to Firebase..."
firebase deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "🌍 Your app is now live at:"
    echo "   Production: https://lidkha.com.ng"
    echo "   Firebase: https://lidkha-learning-platform.web.app"
else
    echo "❌ Deployment failed."
    exit 1
fi

echo ""
echo "✨ Deployment complete!"

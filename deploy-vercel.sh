#!/bin/bash

# Vercel Deployment Script for Anandwan Frontend

echo "🚀 Starting Vercel deployment for Anandwan Frontend..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building React application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📤 Ready for Vercel deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push this code to GitHub"
    echo "2. Go to https://vercel.com"
    echo "3. Import your GitHub repository"
    echo "4. Vercel will auto-detect React and deploy"
    echo "5. Set environment variable in Vercel dashboard:"
    echo "   - REACT_APP_API_URL (your backend URL)"
    echo ""
    echo "Or deploy manually:"
    echo "npx vercel --prod"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
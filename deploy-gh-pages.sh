#!/bin/bash

echo "Building for GitHub Pages..."

# Build with GitHub config
npm run build -- --config vite.config.github.ts

echo "Build complete! Files in dist/"
echo ""
echo "To deploy:"
echo "1. Commit and push to GitHub"
echo "2. Go to Settings > Pages in your repository"
echo "3. Select 'GitHub Actions' as source"
echo "4. The workflow will run automatically on push to main"

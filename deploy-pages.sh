#!/bin/bash

# Build the project
npm run build

# Create a temporary directory
rm -rf gh-pages-temp
mkdir gh-pages-temp

# Copy dist contents to temp directory
cp -r dist/* gh-pages-temp/

# Initialize git in temp directory
cd gh-pages-temp
git init
git add -A
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages

# Force push to gh-pages branch
git remote add origin https://github.com/matheus-rech/cv-presentation.git
git push -f origin gh-pages

# Clean up
cd ..
rm -rf gh-pages-temp

echo "Deployment complete!"
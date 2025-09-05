#!/bin/bash
echo "🚀 Deploying to GitHub Pages..."
npm run build
npx gh-pages -d dist
echo "✅ Deployed! Check: https://matheusrech.github.io/cv-presentation/"

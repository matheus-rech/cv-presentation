#!/bin/bash
echo "🚀 Quick Deploy to GitHub Pages"
git add .
git commit -m "Update CV presentation"
git push origin main
echo "✅ Pushed! GitHub Actions will deploy automatically."
echo "Check status at: https://github.com/5/0/actions"

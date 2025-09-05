#!/bin/bash

echo "🚀 GitHub Pages Deployment Setup"
echo "================================="
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${BLUE}Initializing git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit - CV Presentation"
fi

echo -e "${YELLOW}Please provide your GitHub username:${NC}"
read -p "GitHub username: " github_username

echo -e "${YELLOW}Please provide your repository name (or press enter for 'cv-presentation'):${NC}"
read -p "Repository name: " repo_name
repo_name=${repo_name:-cv-presentation}

# Add vite config for GitHub Pages
echo -e "${BLUE}Configuring Vite for GitHub Pages...${NC}"
cat > vite.config.github.ts << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/REPO_NAME/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
        }
      }
    }
  }
});
EOF

# Replace REPO_NAME with actual repo name
sed -i '' "s/REPO_NAME/${repo_name}/g" vite.config.github.ts

# Create GitHub Actions workflow
echo -e "${BLUE}Creating GitHub Actions workflow...${NC}"
mkdir -p .github/workflows

cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build with Vite
        run: npm run build -- --config vite.config.github.ts
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

# Create deployment script
cat > deploy-gh-pages.sh << 'EOF'
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
EOF

chmod +x deploy-gh-pages.sh

# Update package.json scripts
echo -e "${BLUE}Updating package.json scripts...${NC}"
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts['build:github'] = 'vite build --config vite.config.github.ts';
pkg.scripts['deploy:github'] = './deploy-gh-pages.sh';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo ""
echo -e "${GREEN}✅ GitHub Pages setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Create a new repository on GitHub: https://github.com/new"
echo "   Name it: ${repo_name}"
echo ""
echo "2. Add the remote and push:"
echo -e "${BLUE}   git remote add origin https://github.com/${github_username}/${repo_name}.git${NC}"
echo -e "${BLUE}   git branch -M main${NC}"
echo -e "${BLUE}   git push -u origin main${NC}"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to: https://github.com/${github_username}/${repo_name}/settings/pages"
echo "   - Source: Select 'GitHub Actions'"
echo ""
echo "4. Your site will be available at:"
echo -e "${GREEN}   https://${github_username}.github.io/${repo_name}/${NC}"
echo ""
echo "5. To deploy updates, just push to main branch!"
echo ""

# Create the quick deploy command
cat > github-deploy-quick.sh << EOF
#!/bin/bash
echo "🚀 Quick Deploy to GitHub Pages"
git add .
git commit -m "Update CV presentation"
git push origin main
echo "✅ Pushed! GitHub Actions will deploy automatically."
echo "Check status at: https://github.com/${github_username}/${repo_name}/actions"
EOF

chmod +x github-deploy-quick.sh

echo -e "${YELLOW}Quick deploy script created: ./github-deploy-quick.sh${NC}"
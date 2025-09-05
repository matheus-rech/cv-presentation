#!/bin/bash

echo "🚀 CV Presentation Deployment Script"
echo "===================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to show menu
show_menu() {
    echo "Choose deployment option:"
    echo "1) Build standalone HTML file (single file, works offline)"
    echo "2) Deploy to GitHub Pages"
    echo "3) Deploy to Vercel"
    echo "4) Deploy to Netlify"
    echo "5) Build everything (standalone + prepare for deployment)"
    echo "6) Exit"
    echo ""
    read -p "Enter choice [1-6]: " choice
}

# Build standalone HTML
build_standalone() {
    echo -e "${YELLOW}Building standalone HTML...${NC}"
    node build-standalone.mjs
    echo -e "${GREEN}✅ Standalone HTML created!${NC}"
}

# Deploy to GitHub Pages
deploy_github() {
    echo -e "${YELLOW}Deploying to GitHub Pages...${NC}"
    
    # Check if git repo
    if [ ! -d .git ]; then
        echo -e "${RED}❌ Not a git repository. Initialize with: git init${NC}"
        return
    fi
    
    # Build the project
    npm run build
    
    # Add dist to git temporarily
    git add dist -f
    git commit -m "Deploy to GitHub Pages"
    
    # Push to gh-pages branch
    git subtree push --prefix dist origin gh-pages
    
    echo -e "${GREEN}✅ Deployed to GitHub Pages!${NC}"
    echo "Visit: https://[your-username].github.io/[repo-name]"
}

# Deploy to Vercel
deploy_vercel() {
    echo -e "${YELLOW}Deploying to Vercel...${NC}"
    
    # Check if vercel is installed
    if ! command -v vercel &> /dev/null; then
        echo "Installing Vercel CLI..."
        npm i -g vercel
    fi
    
    # Deploy
    vercel --prod
    
    echo -e "${GREEN}✅ Deployed to Vercel!${NC}"
}

# Deploy to Netlify
deploy_netlify() {
    echo -e "${YELLOW}Deploying to Netlify...${NC}"
    
    # Build first
    npm run build
    
    # Check if netlify-cli is installed
    if ! command -v netlify &> /dev/null; then
        echo "Installing Netlify CLI..."
        npm i -g netlify-cli
    fi
    
    # Deploy
    netlify deploy --prod --dir=dist
    
    echo -e "${GREEN}✅ Deployed to Netlify!${NC}"
}

# Build everything
build_all() {
    echo -e "${YELLOW}Building all deployment options...${NC}"
    
    # Build React app
    npm run build
    
    # Build standalone
    build_standalone
    
    # Create deployment package
    mkdir -p deployment-package
    cp -r dist/* deployment-package/
    cp CV_Presentation_Standalone.html deployment-package/
    
    echo -e "${GREEN}✅ All builds complete!${NC}"
    echo "Files ready in deployment-package/"
}

# Main loop
while true; do
    show_menu
    case $choice in
        1) build_standalone ;;
        2) deploy_github ;;
        3) deploy_vercel ;;
        4) deploy_netlify ;;
        5) build_all ;;
        6) echo "Goodbye!"; exit 0 ;;
        *) echo -e "${RED}Invalid option. Please try again.${NC}" ;;
    esac
    echo ""
    read -p "Press Enter to continue..."
    clear
done
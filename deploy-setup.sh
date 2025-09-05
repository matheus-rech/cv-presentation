#!/bin/bash

echo "🚀 CV Presentation Deployment Setup"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Initialize Git if needed
if [ ! -d .git ]; then
    echo -e "${BLUE}📦 Initializing Git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit - CV Presentation"
    echo -e "${GREEN}✓ Git repository initialized${NC}"
else
    echo -e "${GREEN}✓ Git repository already exists${NC}"
fi

echo ""
echo -e "${YELLOW}Choose deployment method:${NC}"
echo "1) GitHub Pages"
echo "2) Vercel"
echo "3) Netlify"
echo "4) All of the above"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo -e "${BLUE}Setting up GitHub Pages deployment...${NC}"
        ./deploy-github.sh
        ;;
    2)
        echo -e "${BLUE}Setting up Vercel deployment...${NC}"
        ./deploy-vercel.sh
        ;;
    3)
        echo -e "${BLUE}Setting up Netlify deployment...${NC}"
        ./deploy-netlify.sh
        ;;
    4)
        echo -e "${BLUE}Setting up all deployments...${NC}"
        ./deploy-github.sh
        ./deploy-vercel.sh
        ./deploy-netlify.sh
        ;;
    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Deployment setup complete!${NC}"
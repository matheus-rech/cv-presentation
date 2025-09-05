#!/bin/bash

clear

echo "╔════════════════════════════════════════════════════════════╗"
echo "║           🚀 CV PRESENTATION DEPLOYMENT CENTER 🚀           ║"
echo "║                                                            ║"
echo "║          Deploy Your CV to Multiple Platforms             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Function to display menu
show_menu() {
    echo -e "${CYAN}┌─────────────────────────────────────────────┐${NC}"
    echo -e "${CYAN}│          Choose Deployment Platform         │${NC}"
    echo -e "${CYAN}├─────────────────────────────────────────────┤${NC}"
    echo -e "${CYAN}│${NC} ${YELLOW}1)${NC} 📦 GitHub Pages                         ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC}    ${GREEN}→ Free, reliable, git-based${NC}           ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC}                                            ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC} ${YELLOW}2)${NC} ▲ Vercel                               ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC}    ${GREEN}→ Fast, serverless, preview URLs${NC}      ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC}                                            ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC} ${YELLOW}3)${NC} 🔷 Netlify                              ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC}    ${GREEN}→ Drag & drop, forms, split testing${NC}   ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC}                                            ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC} ${YELLOW}4)${NC} 🌐 Deploy to ALL platforms              ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC}                                            ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC} ${YELLOW}5)${NC} 📋 View iframe embed codes              ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC}                                            ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC} ${YELLOW}6)${NC} 🧪 Test local build                     ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC}                                            ${CYAN}│${NC}"
    echo -e "${CYAN}│${NC} ${YELLOW}0)${NC} Exit                                    ${CYAN}│${NC}"
    echo -e "${CYAN}└─────────────────────────────────────────────┘${NC}"
    echo ""
}

# Initialize git if needed
init_git() {
    if [ ! -d .git ]; then
        echo -e "${BLUE}📦 Initializing Git repository...${NC}"
        git init
        git add .
        git commit -m "Initial commit - CV Presentation"
        echo -e "${GREEN}✓ Git repository initialized${NC}"
        echo ""
    fi
}

# Main loop
while true; do
    show_menu
    read -p "$(echo -e ${PURPLE}Enter your choice [0-6]: ${NC})" choice
    echo ""
    
    case $choice in
        1)
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo -e "${YELLOW}      📦 GitHub Pages Deployment${NC}"
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo ""
            init_git
            ./deploy-github.sh
            echo ""
            read -p "Press Enter to continue..."
            clear
            ;;
            
        2)
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo -e "${YELLOW}         ▲ Vercel Deployment${NC}"
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo ""
            ./deploy-vercel.sh
            echo ""
            echo -e "${YELLOW}Ready to deploy? Run:${NC}"
            echo -e "${BLUE}   vercel${NC}"
            echo ""
            read -p "Press Enter to continue..."
            clear
            ;;
            
        3)
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo -e "${YELLOW}        🔷 Netlify Deployment${NC}"
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo ""
            ./deploy-netlify.sh
            echo ""
            read -p "Press Enter to continue..."
            clear
            ;;
            
        4)
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo -e "${YELLOW}    🌐 Deploy to ALL Platforms${NC}"
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo ""
            init_git
            
            echo -e "${CYAN}Setting up all deployments...${NC}"
            echo ""
            
            echo "1️⃣ GitHub Pages setup..."
            ./deploy-github.sh
            echo ""
            
            echo "2️⃣ Vercel setup..."
            ./deploy-vercel.sh
            echo ""
            
            echo "3️⃣ Netlify setup..."
            ./deploy-netlify.sh
            echo ""
            
            echo -e "${GREEN}✅ All deployment configurations ready!${NC}"
            echo ""
            read -p "Press Enter to continue..."
            clear
            ;;
            
        5)
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo -e "${YELLOW}      📋 Iframe Embed Codes${NC}"
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo ""
            echo "Opening iframe embed guide in browser..."
            open iframe-embed.html
            echo ""
            echo -e "${GREEN}✅ Iframe guide opened in browser${NC}"
            echo ""
            read -p "Press Enter to continue..."
            clear
            ;;
            
        6)
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo -e "${YELLOW}        🧪 Test Local Build${NC}"
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo ""
            echo "Building project..."
            npm run build
            echo ""
            echo -e "${GREEN}✅ Build complete!${NC}"
            echo ""
            echo "Starting preview server..."
            echo -e "${YELLOW}Preview will open at: http://localhost:4173${NC}"
            echo ""
            npm run preview
            ;;
            
        0)
            echo -e "${GREEN}👋 Thank you for using CV Presentation Deployment Center!${NC}"
            echo ""
            exit 0
            ;;
            
        *)
            echo -e "${RED}Invalid option. Please choose 0-6.${NC}"
            echo ""
            sleep 2
            clear
            ;;
    esac
done
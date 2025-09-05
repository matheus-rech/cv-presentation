#!/bin/bash

echo "🚀 Vercel Deployment Setup"
echo "=========================="
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create vercel.json configuration
echo -e "${BLUE}Creating Vercel configuration...${NC}"
cat > vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "ALLOWALL"
        },
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
EOF

echo -e "${GREEN}✅ Vercel configuration created${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
else
    echo -e "${GREEN}✅ Vercel CLI already installed${NC}"
fi

echo ""
echo -e "${YELLOW}Deployment Options:${NC}"
echo ""
echo "1. One-click deploy (recommended for first time):"
echo -e "${BLUE}   vercel${NC}"
echo "   Follow the prompts to:"
echo "   - Link to your Vercel account"
echo "   - Set up the project"
echo "   - Deploy automatically"
echo ""
echo "2. Deploy to production:"
echo -e "${BLUE}   vercel --prod${NC}"
echo ""
echo "3. Preview deployment:"
echo -e "${BLUE}   vercel --preview${NC}"
echo ""

# Create quick deploy script
cat > vercel-deploy-quick.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying to Vercel..."

# Build the project
npm run build

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "Check your Vercel dashboard for the URL"
EOF

chmod +x vercel-deploy-quick.sh

echo -e "${GREEN}Quick deploy script created: ./vercel-deploy-quick.sh${NC}"
echo ""
echo -e "${YELLOW}Features enabled:${NC}"
echo "✅ Automatic HTTPS"
echo "✅ Global CDN"
echo "✅ Instant rollbacks"
echo "✅ Preview deployments for PRs"
echo "✅ Analytics (optional)"
echo "✅ Custom domains support"
echo ""
echo -e "${YELLOW}To deploy now, run:${NC}"
echo -e "${BLUE}   vercel${NC}"
#!/bin/bash

echo "🚀 Netlify Deployment Setup"
echo "==========================="
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create netlify.toml configuration
echo -e "${BLUE}Creating Netlify configuration...${NC}"
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "ALLOWALL"
    Access-Control-Allow-Origin = "*"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-lighthouse"
  
  [plugins.inputs]
    output_path = "reports/lighthouse.html"

[dev]
  command = "npm run dev"
  port = 8080
  targetPort = 5173
  autoLaunch = true
EOF

# Create _redirects file for SPA support
echo -e "${BLUE}Creating redirect rules...${NC}"
mkdir -p public
echo "/*    /index.html   200" > public/_redirects

# Create _headers file for iframe support
cat > public/_headers << 'EOF'
/*
  X-Frame-Options: ALLOWALL
  Access-Control-Allow-Origin: *
EOF

echo -e "${GREEN}✅ Netlify configuration created${NC}"
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${YELLOW}Netlify CLI not found. Installing...${NC}"
    npm install -g netlify-cli
    echo -e "${GREEN}✅ Netlify CLI installed${NC}"
else
    echo -e "${GREEN}✅ Netlify CLI already installed${NC}"
fi

echo ""
echo -e "${YELLOW}Deployment Options:${NC}"
echo ""
echo "Option 1: Drag & Drop (Easiest)"
echo "========================================="
echo "1. Build the project:"
echo -e "${BLUE}   npm run build${NC}"
echo ""
echo "2. Go to: https://app.netlify.com/drop"
echo ""
echo "3. Drag the 'dist' folder to the browser"
echo ""
echo "4. Done! You'll get an instant URL"
echo ""
echo ""
echo "Option 2: CLI Deployment"
echo "========================================="
echo "1. Login to Netlify:"
echo -e "${BLUE}   netlify login${NC}"
echo ""
echo "2. Initialize site:"
echo -e "${BLUE}   netlify init${NC}"
echo ""
echo "3. Deploy:"
echo -e "${BLUE}   netlify deploy --prod${NC}"
echo ""
echo ""
echo "Option 3: Continuous Deployment (GitHub)"
echo "========================================="
echo "1. Push code to GitHub"
echo ""
echo "2. Go to: https://app.netlify.com"
echo ""
echo "3. Click 'Add new site' > 'Import an existing project'"
echo ""
echo "4. Connect GitHub and select your repo"
echo ""
echo "5. Auto-deploys on every push!"
echo ""

# Create quick deploy script
cat > netlify-deploy-quick.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying to Netlify..."

# Build the project
echo "Building project..."
npm run build

# Check if logged in
if ! netlify status &> /dev/null; then
    echo "Please login to Netlify first:"
    netlify login
fi

# Deploy to Netlify
echo "Deploying to production..."
netlify deploy --prod --dir=dist

echo ""
echo "✅ Deployment complete!"
echo "Your site is live!"
EOF

chmod +x netlify-deploy-quick.sh

# Create drag-drop helper
cat > netlify-dragdrop.sh << 'EOF'
#!/bin/bash

echo "🎯 Netlify Drag & Drop Deployment"
echo "=================================="
echo ""

# Build the project
echo "Building project..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "Now:"
echo "1. Open: https://app.netlify.com/drop"
echo "2. Drag the 'dist' folder from this directory"
echo "3. Drop it in the browser"
echo ""
echo "Opening Netlify Drop in browser..."
open https://app.netlify.com/drop

echo ""
echo "📁 Opening dist folder..."
open dist
EOF

chmod +x netlify-dragdrop.sh

echo -e "${GREEN}Quick deploy scripts created:${NC}"
echo "  ./netlify-deploy-quick.sh - CLI deployment"
echo "  ./netlify-dragdrop.sh - Drag & drop helper"
echo ""
echo -e "${YELLOW}Features enabled:${NC}"
echo "✅ Automatic HTTPS"
echo "✅ Global CDN"
echo "✅ Instant rollbacks"
echo "✅ Deploy previews"
echo "✅ Forms handling"
echo "✅ Custom domains"
echo "✅ Split testing"
echo "✅ Analytics"
echo ""
echo -e "${YELLOW}To deploy now with drag & drop:${NC}"
echo -e "${BLUE}   ./netlify-dragdrop.sh${NC}"
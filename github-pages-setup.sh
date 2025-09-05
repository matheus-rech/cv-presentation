#!/bin/bash

echo "🚀 GitHub Pages Deployment for Matheus Rech"
echo "==========================================="
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Get GitHub username
echo -e "${YELLOW}Enter your GitHub username (or press Enter for 'matheusrech'):${NC}"
read -p "GitHub username: " github_user
github_user=${github_user:-matheusrech}

echo -e "${YELLOW}Enter repository name (or press Enter for 'cv-presentation'):${NC}"
read -p "Repository name: " repo_name
repo_name=${repo_name:-cv-presentation}

# Update vite config for GitHub Pages
echo -e "${BLUE}Updating Vite config for GitHub Pages...${NC}"
cat > vite.config.ts << EOF
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/${repo_name}/',
  server: {
    host: 'localhost',
    port: 8080,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
EOF

echo -e "${GREEN}✅ Vite config updated${NC}"

# Build the project
echo -e "${BLUE}Building project for GitHub Pages...${NC}"
npm run build

echo -e "${GREEN}✅ Build complete${NC}"

# Create gh-pages branch and deploy
echo -e "${BLUE}Setting up gh-pages branch...${NC}"

# Check if remote exists
if git remote | grep -q origin; then
    echo -e "${YELLOW}Remote 'origin' already exists${NC}"
else
    echo -e "${CYAN}Add your GitHub repository as remote:${NC}"
    echo -e "${BLUE}git remote add origin https://github.com/${github_user}/${repo_name}.git${NC}"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ GitHub Pages Setup Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo "1️⃣  Create repository on GitHub:"
echo -e "${CYAN}   https://github.com/new${NC}"
echo "   Name it: ${repo_name}"
echo ""
echo "2️⃣  Add remote and push:"
echo -e "${BLUE}   git remote add origin https://github.com/${github_user}/${repo_name}.git${NC}"
echo -e "${BLUE}   git branch -M main${NC}"
echo -e "${BLUE}   git add .${NC}"
echo -e "${BLUE}   git commit -m 'Deploy CV presentation'${NC}"
echo -e "${BLUE}   git push -u origin main${NC}"
echo ""
echo "3️⃣  Enable GitHub Pages:"
echo "   Go to: https://github.com/${github_user}/${repo_name}/settings/pages"
echo "   • Source: Deploy from a branch"
echo "   • Branch: Select 'gh-pages' (we'll create it next)"
echo "   • Folder: / (root)"
echo ""
echo "4️⃣  Deploy to gh-pages branch:"
echo -e "${BLUE}   npm install --save-dev gh-pages${NC}"
echo -e "${BLUE}   npx gh-pages -d dist${NC}"
echo ""
echo "5️⃣  Your site will be live at:"
echo -e "${GREEN}   https://${github_user}.github.io/${repo_name}/${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Create deployment helper
cat > deploy-to-github.sh << EOF
#!/bin/bash
echo "🚀 Deploying to GitHub Pages..."
npm run build
npx gh-pages -d dist
echo "✅ Deployed! Check: https://${github_user}.github.io/${repo_name}/"
EOF

chmod +x deploy-to-github.sh

echo -e "${CYAN}Quick deploy script created: ./deploy-to-github.sh${NC}"
echo ""

# Generate iframe codes with actual URL
cat > github-iframe-codes.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Pages - Iframe Codes for Your CV</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        h1 {
            color: #1e293b;
            margin-bottom: 10px;
            font-size: 32px;
        }
        .url {
            color: #3b82f6;
            font-size: 18px;
            margin-bottom: 30px;
            word-break: break-all;
        }
        .code-section {
            margin: 30px 0;
            padding: 25px;
            background: #f8fafc;
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
        }
        h2 {
            color: #475569;
            margin-bottom: 15px;
            font-size: 20px;
        }
        .code-block {
            background: #0f172a;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            margin: 15px 0;
            position: relative;
        }
        .copy-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
        }
        .copy-btn:hover {
            background: #2563eb;
        }
        .note {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .success {
            background: #d1fae5;
            border-left: 4px solid #10b981;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #065f46;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Your CV Presentation on GitHub Pages</h1>
        <div class="url">https://${github_user}.github.io/${repo_name}/</div>
        
        <div class="success">
            <strong>✅ Ready to embed!</strong> Use these codes once your site is deployed to GitHub Pages.
        </div>

        <div class="code-section">
            <h2>📱 Responsive Iframe (Recommended)</h2>
            <p>Automatically adjusts to container width:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <code>&lt;div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);"&gt;
    &lt;iframe 
        src="https://${github_user}.github.io/${repo_name}/" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
        frameborder="0"
        allowfullscreen="true"
        title="CV Presentation - Dr. Matheus Machado Rech"&gt;
    &lt;/iframe&gt;
&lt;/div&gt;</code>
            </div>
        </div>

        <div class="code-section">
            <h2>🖼️ Fixed Size Iframe</h2>
            <p>Standard size for most websites:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <code>&lt;iframe 
    src="https://${github_user}.github.io/${repo_name}/" 
    width="100%" 
    height="600"
    frameborder="0"
    allowfullscreen="true"
    style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
    title="CV Presentation - Dr. Matheus Machado Rech"&gt;
&lt;/iframe&gt;</code>
            </div>
        </div>

        <div class="code-section">
            <h2>🎯 Direct Link to Specific Slide</h2>
            <p>Link to any slide directly:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <code>&lt;!-- Slide 1: Title --&gt;
&lt;iframe src="https://${github_user}.github.io/${repo_name}/#slide-1" width="100%" height="600" frameborder="0"&gt;&lt;/iframe&gt;

&lt;!-- Slide 2: Academic Background --&gt;
&lt;iframe src="https://${github_user}.github.io/${repo_name}/#slide-2" width="100%" height="600" frameborder="0"&gt;&lt;/iframe&gt;

&lt;!-- Slide 3: Teaching Experience --&gt;
&lt;iframe src="https://${github_user}.github.io/${repo_name}/#slide-3" width="100%" height="600" frameborder="0"&gt;&lt;/iframe&gt;</code>
            </div>
        </div>

        <div class="code-section">
            <h2>✨ Premium Styled Container</h2>
            <p>Professional presentation with gradient border:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <code>&lt;div style="
    max-width: 1200px; 
    margin: 20px auto; 
    padding: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;"&gt;
    &lt;iframe 
        src="https://${github_user}.github.io/${repo_name}/" 
        width="100%" 
        height="700"
        frameborder="0"
        style="border-radius: 12px; background: white; display: block;"
        allowfullscreen="true"
        title="CV Presentation - Dr. Matheus Machado Rech"&gt;
    &lt;/iframe&gt;
&lt;/div&gt;</code>
            </div>
        </div>

        <div class="code-section">
            <h2>🔗 Simple Link Button</h2>
            <p>Open in new window:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <code>&lt;a href="https://${github_user}.github.io/${repo_name}/" 
   target="_blank" 
   style="
    display: inline-block;
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    font-family: sans-serif;
    transition: transform 0.2s;"
   onmouseover="this.style.transform='scale(1.05)'"
   onmouseout="this.style.transform='scale(1)'"&gt;
    📄 View My CV Presentation
&lt;/a&gt;</code>
            </div>
        </div>

        <div class="note">
            <strong>📌 Note:</strong> These codes will work once you've completed the GitHub Pages deployment. The site typically goes live within 5-10 minutes after pushing to the gh-pages branch.
        </div>

        <div class="code-section" style="background: #f0f9ff; border-left-color: #0ea5e9;">
            <h2>🚀 Quick Deployment Commands</h2>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <code># First time setup
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run build
npx gh-pages -d dist

# Or use the helper script
./deploy-to-github.sh</code>
            </div>
        </div>
    </div>

    <script>
        function copyCode(btn) {
            const codeBlock = btn.parentElement;
            const code = codeBlock.querySelector('code').textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                const originalText = btn.textContent;
                btn.textContent = '✅ Copied!';
                btn.style.background = '#10b981';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '#3b82f6';
                }, 2000);
            });
        }
    </script>
</body>
</html>
EOF

echo -e "${GREEN}✅ Iframe codes generated: github-iframe-codes.html${NC}"
echo ""
echo "Opening iframe codes in browser..."
open github-iframe-codes.html
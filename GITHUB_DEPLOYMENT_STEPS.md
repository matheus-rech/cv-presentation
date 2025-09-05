# 🚀 GitHub Pages Deployment - Step by Step

## ✅ Prerequisites Complete!
- ✓ Git initialized
- ✓ Project built successfully
- ✓ gh-pages package installed
- ✓ Iframe codes ready

---

## 📋 Step 1: Create GitHub Repository

1. **Open GitHub**: https://github.com/new
2. **Repository name**: `cv-presentation`
3. **Description**: "Professional CV Presentation - Dr. Matheus Machado Rech"
4. **Visibility**: Public (required for GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

---

## 📋 Step 2: Connect and Push Your Code

Copy and run these commands in your terminal:

```bash
# Add GitHub remote
git remote add origin https://github.com/matheusrech/cv-presentation.git

# Switch to main branch
git branch -M main

# Add all files
git add .

# Commit
git commit -m "Initial deployment - CV presentation with GitHub Pages setup"

# Push to GitHub
git push -u origin main
```

---

## 📋 Step 3: Deploy to GitHub Pages

Run this single command to deploy:

```bash
npx gh-pages -d dist
```

Or use the helper script:
```bash
./deploy-to-github.sh
```

This will:
- Create a `gh-pages` branch
- Upload the built files
- Configure GitHub Pages automatically

---

## 📋 Step 4: Enable GitHub Pages (if needed)

1. Go to: https://github.com/matheusrech/cv-presentation/settings/pages
2. Under **Source**, select:
   - **Deploy from a branch**
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
3. Click **Save**

---

## 📋 Step 5: Access Your Live Site!

Your CV will be available at:
### 🌐 https://matheusrech.github.io/cv-presentation/

**Note**: It may take 5-10 minutes for the first deployment to go live.

---

## 🖼️ Iframe Codes Ready!

Open this file to get all iframe embed codes:
```bash
open github-iframe-codes.html
```

### Quick Iframe Example:
```html
<iframe 
    src="https://matheusrech.github.io/cv-presentation/" 
    width="100%" 
    height="600"
    frameborder="0"
    allowfullscreen="true">
</iframe>
```

---

## 🔄 Future Updates

To update your CV presentation:

```bash
# Make your changes
# Then build and deploy:
npm run build
npx gh-pages -d dist
```

Or use the quick script:
```bash
./deploy-to-github.sh
```

---

## ✨ Your deployment is ready to go!

Just follow steps 1-5 above and your CV will be live on GitHub Pages with iframe support!
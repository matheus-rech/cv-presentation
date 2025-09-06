# CV Presentation Deployment Solutions

Since GitHub Pages is having issues, here are alternative deployment options:

## Option 1: Use the Standalone HTML File (RECOMMENDED)

The `CV_Presentation_Standalone_Fixed.html` file is a complete, self-contained version that includes all styles, scripts, and images embedded. You can:

1. **Open it directly in any browser** - Just double-click the file
2. **Host it anywhere** - Upload to any web server, Google Drive, Dropbox, etc.
3. **Email it** - Send the single HTML file to anyone

### To use the standalone file:
```bash
# Open in browser
open CV_Presentation_Standalone_Fixed.html

# Or host it locally
python3 -m http.server 8000
# Then visit: http://localhost:8000/CV_Presentation_Standalone_Fixed.html
```

## Option 2: Deploy to GitHub Gist

1. Create a new Gist at https://gist.github.com
2. Copy the contents of `CV_Presentation_Standalone_Fixed.html`
3. Name the file `index.html`
4. Save the Gist
5. Use RawGit or GitHack to serve it:
   - Take your Gist URL: `https://gist.github.com/USERNAME/GIST_ID`
   - Convert to: `https://gistcdn.githack.com/USERNAME/GIST_ID/raw/index.html`

## Option 3: Use Local Server

The app is currently running locally at http://localhost:8080

To share it on your local network:
```bash
npm run dev -- --host
```

## Option 4: Iframe Embed Codes

### Full Size Iframe
```html
<iframe 
  src="CV_Presentation_Standalone_Fixed.html" 
  width="100%" 
  height="100vh" 
  frameborder="0"
  style="border: none;">
</iframe>
```

### Fixed Size Iframe
```html
<iframe 
  src="CV_Presentation_Standalone_Fixed.html" 
  width="1200" 
  height="800" 
  frameborder="0"
  style="border: 1px solid #ccc; border-radius: 8px;">
</iframe>
```

### Responsive Iframe
```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    src="CV_Presentation_Standalone_Fixed.html" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    frameborder="0">
  </iframe>
</div>
```

## Option 5: Quick Deploy to Free Hosting

### Using GitHub (via jsDelivr CDN)
1. The files are already in your GitHub repo
2. Access via: `https://cdn.jsdelivr.net/gh/matheus-rech/cv-presentation@main/CV_Presentation_Standalone_Fixed.html`

### Using Google Drive
1. Upload `CV_Presentation_Standalone_Fixed.html` to Google Drive
2. Right-click → Get shareable link
3. Change the link format from:
   `https://drive.google.com/file/d/FILE_ID/view`
   to:
   `https://drive.google.com/uc?export=view&id=FILE_ID`

## Option 6: Professional Deployment (When Ready)

For a production deployment with custom domain:

1. **Vercel** (Recommended)
   ```bash
   vercel --prod
   ```

2. **Netlify Drop**
   - Visit: https://app.netlify.com/drop
   - Drag the `dist` folder to the browser
   - Instant deployment!

3. **Cloudflare Pages**
   - Visit: https://pages.cloudflare.com
   - Connect GitHub repo
   - Auto-deploy on push

## Current Status

✅ Standalone HTML file is ready and working
✅ Local development server is running at http://localhost:8080
✅ All content and functionality is preserved
✅ No external dependencies required

## Recommended Action

Use the **standalone HTML file** (`CV_Presentation_Standalone_Fixed.html`) - it's the simplest and most reliable solution. It works offline, can be shared easily, and preserves all functionality.
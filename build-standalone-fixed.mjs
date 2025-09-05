import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execAsync = promisify(exec);

console.log('🏗️  Building FIXED standalone HTML presentation...\n');

async function buildStandalone() {
  try {
    // Step 1: Build the React app
    console.log('📦 Building React app...');
    await execAsync('npm run build');
    console.log('✅ Build complete\n');

    // Step 2: Read the built HTML
    console.log('📖 Reading built files...');
    const htmlPath = path.join(__dirname, 'dist', 'index.html');
    let html = await fs.readFile(htmlPath, 'utf-8');

    // Step 3: Find and inline all CSS files
    console.log('🎨 Inlining CSS...');
    const assetsDir = path.join(__dirname, 'dist', 'assets');
    const files = await fs.readdir(assetsDir);
    
    // Process CSS files
    for (const file of files.filter(f => f.endsWith('.css'))) {
      const cssContent = await fs.readFile(path.join(assetsDir, file), 'utf-8');
      // Replace both relative and absolute paths
      const patterns = [
        new RegExp(`<link[^>]*href="[^"]*${file}"[^>]*>`, 'g'),
        new RegExp(`<link[^>]*href="[^"]*/assets/${file}"[^>]*>`, 'g'),
        new RegExp(`<link[^>]*href="./assets/${file}"[^>]*>`, 'g')
      ];
      
      for (const pattern of patterns) {
        html = html.replace(pattern, `<style>${cssContent}</style>`);
      }
      console.log(`  ✓ Inlined ${file}`);
    }

    // Step 4: Find and inline all JS files
    console.log('📜 Inlining JavaScript...');
    
    // Process JS files
    for (const file of files.filter(f => f.endsWith('.js'))) {
      const jsContent = await fs.readFile(path.join(assetsDir, file), 'utf-8');
      // Replace both relative and absolute paths
      const patterns = [
        new RegExp(`<script[^>]*src="[^"]*${file}"[^>]*></script>`, 'g'),
        new RegExp(`<script[^>]*src="[^"]*/assets/${file}"[^>]*></script>`, 'g'),
        new RegExp(`<script[^>]*src="./assets/${file}"[^>]*></script>`, 'g')
      ];
      
      for (const pattern of patterns) {
        // Note: Remove type="module" and crossorigin when inlining
        html = html.replace(pattern, `<script>${jsContent}</script>`);
      }
      console.log(`  ✓ Inlined ${file}`);
    }

    // Step 5: Process images
    console.log('🖼️  Processing images...');
    
    // Find all image references
    const imagePattern = /\/lovable-uploads\/[a-zA-Z0-9\-\/\.]+\.(jpg|jpeg|png|gif|svg|webp)/gi;
    const imageMatches = [...new Set(html.match(imagePattern) || [])];
    
    for (const imagePath of imageMatches) {
      // Try to find the image in public directory
      const localPath = path.join(__dirname, 'public', imagePath);
      try {
        const imageData = await fs.readFile(localPath);
        const base64 = imageData.toString('base64');
        const ext = path.extname(imagePath).slice(1);
        const mimeType = ext === 'svg' ? 'svg+xml' : ext;
        const dataUrl = `data:image/${mimeType};base64,${base64}`;
        
        // Replace all occurrences
        html = html.replaceAll(imagePath, dataUrl);
        console.log(`  ✓ Embedded ${path.basename(imagePath)}`);
      } catch (err) {
        console.log(`  ⚠️  Could not embed ${imagePath}`);
      }
    }

    // Step 6: Fix any remaining relative paths
    console.log('🔧 Fixing paths...');
    
    // Remove any remaining external script/link references that might cause CORS issues
    html = html.replace(/<script[^>]*src="\.\/[^"]*"[^>]*><\/script>/g, '');
    html = html.replace(/<link[^>]*href="\.\/[^"]*"[^>]*>/g, '');
    
    // Step 7: Add metadata
    const metadata = `
    <!-- Standalone CV Presentation -->
    <!-- Generated: ${new Date().toISOString()} -->
    <!-- Single-file HTML with all assets embedded -->
    `;
    
    html = html.replace('<head>', `<head>\n${metadata}`);

    // Step 8: Save the standalone file
    const outputPath = path.join(__dirname, 'CV_Presentation_Standalone_Fixed.html');
    await fs.writeFile(outputPath, html);
    
    // Get file size
    const stats = await fs.stat(outputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Standalone HTML created successfully!');
    console.log(`📁 File: CV_Presentation_Standalone_Fixed.html`);
    console.log(`📊 Size: ${sizeMB} MB`);
    console.log('🚀 Ready to use - works offline!');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildStandalone();
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

console.log('🏗️  Building standalone HTML presentation...\n');

async function buildStandalone() {
  try {
    // Step 1: Build the React app
    console.log('📦 Building React app...');
    await execAsync('npm run build');
    console.log('✅ Build complete\n');

    // Step 2: Read the built HTML
    console.log('📖 Reading built files...');
    const htmlPath = path.join('dist', 'index.html');
    let html = await fs.readFile(htmlPath, 'utf-8');

    // Step 3: Find and inline all CSS files
    console.log('🎨 Inlining CSS...');
    const cssFiles = await fs.readdir(path.join('dist', 'assets'));
    const cssFileList = cssFiles.filter(f => f.endsWith('.css'));
    
    for (const cssFile of cssFileList) {
      const cssContent = await fs.readFile(path.join('dist', 'assets', cssFile), 'utf-8');
      // Replace link tag with inline style
      const linkPattern = new RegExp(`<link[^>]*href="[^"]*${cssFile}"[^>]*>`, 'g');
      html = html.replace(linkPattern, `<style>${cssContent}</style>`);
    }

    // Step 4: Find and inline all JS files
    console.log('📜 Inlining JavaScript...');
    const jsFiles = cssFiles.filter(f => f.endsWith('.js'));
    
    for (const jsFile of jsFiles) {
      const jsContent = await fs.readFile(path.join('dist', 'assets', jsFile), 'utf-8');
      // Replace script tag with inline script
      const scriptPattern = new RegExp(`<script[^>]*src="[^"]*${jsFile}"[^>]*></script>`, 'g');
      html = html.replace(scriptPattern, `<script>${jsContent}</script>`);
    }

    // Step 5: Inline any images as base64
    console.log('🖼️  Processing images...');
    const imagePattern = /\/lovable-uploads\/[^"'\s]*/g;
    const images = html.match(imagePattern) || [];
    
    for (const imagePath of [...new Set(images)]) {
      try {
        const fullPath = path.join('dist', imagePath);
        const imageData = await fs.readFile(fullPath);
        const base64 = imageData.toString('base64');
        const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
        const dataUri = `data:${mimeType};base64,${base64}`;
        html = html.replace(new RegExp(imagePath, 'g'), dataUri);
      } catch (e) {
        console.log(`  ⚠️  Could not inline image: ${imagePath}`);
      }
    }

    // Step 6: Add metadata and optimize
    console.log('🔧 Adding metadata...');
    const metadata = `
    <meta name="author" content="Dr. Matheus Machado Rech">
    <meta name="description" content="Professional CV presentation of Dr. Matheus Machado Rech - Medical Doctor, Researcher, and Educator">
    <meta property="og:title" content="Dr. Matheus Machado Rech - CV Presentation">
    <meta property="og:description" content="Professional CV presentation featuring research, publications, and achievements">
    <meta property="og:type" content="website">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    `;
    
    html = html.replace('<head>', `<head>\n${metadata}`);

    // Step 7: Clean up paths
    html = html.replace(/\/assets\//g, './assets/');
    html = html.replace(/href="\//g, 'href="./');
    html = html.replace(/src="\//g, 'src="./');

    // Step 8: Save standalone file
    const outputPath = 'CV_Presentation_Standalone.html';
    await fs.writeFile(outputPath, html, 'utf-8');
    
    // Get file size
    const stats = await fs.stat(outputPath);
    const sizeInKB = (stats.size / 1024).toFixed(2);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log('\n✨ Success! Standalone HTML created');
    console.log(`📄 File: ${outputPath}`);
    console.log(`📊 Size: ${sizeInKB} KB (${sizeInMB} MB)`);
    console.log(`📍 Location: ${path.resolve(outputPath)}`);
    
    console.log('\n🎯 This file can be:');
    console.log('  • Opened directly in any browser');
    console.log('  • Sent via email');
    console.log('  • Hosted anywhere');
    console.log('  • Embedded in iframes');
    console.log('  • Works completely offline');

  } catch (error) {
    console.error('❌ Error building standalone:', error);
  }
}

// Run the build
buildStandalone();
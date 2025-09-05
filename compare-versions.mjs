import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Visual Comparison Tool\n');

async function captureScreenshots() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });

  // Create directories
  await fs.mkdir('comparison/react', { recursive: true });
  await fs.mkdir('comparison/html', { recursive: true });
  await fs.mkdir('comparison/side-by-side', { recursive: true });

  const slideNames = [
    'title',
    'academic-background',
    'teaching-experience',
    'continuing-education',
    'leadership-service',
    'honors-awards',
    'publications',
    'abstracts'
  ];

  // Capture React version
  console.log('📸 Capturing React version...');
  const reactContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const reactPage = await reactContext.newPage();
  
  await reactPage.goto('http://localhost:8080');
  await reactPage.waitForTimeout(2000);
  
  // Enable clean mode
  const cleanButton = await reactPage.locator('button').filter({ has: reactPage.locator('svg') }).last();
  await cleanButton.click();
  await reactPage.waitForTimeout(500);
  
  for (let i = 0; i < slideNames.length; i++) {
    console.log(`  Slide ${i + 1}: ${slideNames[i]}`);
    await reactPage.screenshot({ 
      path: `comparison/react/${i + 1}-${slideNames[i]}.png`,
      fullPage: false
    });
    
    if (i < slideNames.length - 1) {
      await reactPage.keyboard.press('ArrowRight');
      await reactPage.waitForTimeout(300);
    }
  }
  
  // Test clean mode toggle
  console.log('  Testing clean mode toggle...');
  await cleanButton.click();
  await reactPage.waitForTimeout(300);
  await reactPage.screenshot({ 
    path: `comparison/react/ui-visible.png`,
    fullPage: false
  });

  // Capture HTML standalone version
  console.log('\n📸 Capturing HTML standalone version...');
  const htmlContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const htmlPage = await htmlContext.newPage();
  
  const htmlPath = path.join(__dirname, 'CV_Presentation_Standalone.html');
  await htmlPage.goto(`file://${htmlPath}`);
  await htmlPage.waitForTimeout(2000);
  
  // Try to enable clean mode
  try {
    const htmlCleanButton = await htmlPage.locator('button').filter({ has: htmlPage.locator('svg') }).last();
    await htmlCleanButton.click();
    await htmlPage.waitForTimeout(500);
    console.log('  ✅ Clean mode works in HTML');
  } catch (e) {
    console.log('  ⚠️  Clean mode issue in HTML');
  }
  
  for (let i = 0; i < slideNames.length; i++) {
    console.log(`  Slide ${i + 1}: ${slideNames[i]}`);
    await htmlPage.screenshot({ 
      path: `comparison/html/${i + 1}-${slideNames[i]}.png`,
      fullPage: false
    });
    
    if (i < slideNames.length - 1) {
      await htmlPage.keyboard.press('ArrowRight');
      await htmlPage.waitForTimeout(300);
    }
  }
  
  // Test clean mode toggle in HTML
  console.log('  Testing clean mode toggle...');
  try {
    const htmlCleanButton = await htmlPage.locator('button').filter({ has: htmlPage.locator('svg') }).last();
    await htmlCleanButton.click();
    await htmlPage.waitForTimeout(300);
    await htmlPage.screenshot({ 
      path: `comparison/html/ui-visible.png`,
      fullPage: false
    });
  } catch (e) {
    console.log('  ⚠️  Could not toggle UI in HTML');
  }

  await browser.close();
  
  console.log('\n✅ Screenshots captured!');
  console.log('📁 Check comparison/react/ and comparison/html/ folders');
  
  // Report on initial observations
  console.log('\n📊 Initial Observations:');
  console.log('- React version: comparison/react/');
  console.log('- HTML version: comparison/html/');
  console.log('\nPlease review the screenshots to identify differences.');
  
  return slideNames;
}

// Create HTML comparison page
async function createComparisonHTML(slideNames) {
  console.log('\n📄 Creating comparison HTML...');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React vs HTML Comparison</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f3f4f6;
    }
    h1 {
      text-align: center;
      color: #1f2937;
    }
    .comparison-grid {
      display: grid;
      gap: 30px;
      max-width: 1800px;
      margin: 0 auto;
    }
    .slide-comparison {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .slide-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #374151;
      text-transform: capitalize;
    }
    .images-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .image-wrapper {
      position: relative;
    }
    .image-label {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }
    img {
      width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
    }
    .differences {
      margin-top: 15px;
      padding: 10px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 4px;
      color: #991b1b;
      font-size: 14px;
    }
    .no-differences {
      background: #f0fdf4;
      border-color: #bbf7d0;
      color: #166534;
    }
  </style>
</head>
<body>
  <h1>React vs HTML Standalone - Visual Comparison</h1>
  <div class="comparison-grid">
    ${slideNames.map((name, i) => `
      <div class="slide-comparison">
        <div class="slide-title">Slide ${i + 1}: ${name.replace('-', ' ')}</div>
        <div class="images-container">
          <div class="image-wrapper">
            <div class="image-label">REACT</div>
            <img src="../react/${i + 1}-${name}.png" alt="React - ${name}">
          </div>
          <div class="image-wrapper">
            <div class="image-label">HTML</div>
            <img src="../html/${i + 1}-${name}.png" alt="HTML - ${name}">
          </div>
        </div>
        <div class="differences" id="diff-${i}">
          <!-- Differences will be noted here after review -->
        </div>
      </div>
    `).join('')}
  </div>
  
  <script>
    // Placeholder for difference detection
    console.log('Review the images above to identify differences');
  </script>
</body>
</html>`;

  await fs.writeFile('comparison/side-by-side/index.html', html);
  console.log('✅ Comparison HTML created: comparison/side-by-side/index.html');
}

// Main execution
async function main() {
  try {
    const slideNames = await captureScreenshots();
    await createComparisonHTML(slideNames);
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Open comparison/side-by-side/index.html in browser');
    console.log('2. Review differences between React and HTML versions');
    console.log('3. We\'ll fix any identified issues');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();
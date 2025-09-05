import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Analyzing Visual Differences\n');

const differences = [];

async function analyzeVisualDifferences() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });

  // Test React version first
  console.log('📱 Testing React App...');
  const reactContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const reactPage = await reactContext.newPage();
  
  await reactPage.goto('http://localhost:8080');
  await reactPage.waitForTimeout(2000);
  
  // Check clean mode functionality
  const reactCleanButton = await reactPage.locator('button').filter({ has: reactPage.locator('svg') }).last();
  const reactHasCleanMode = await reactCleanButton.isVisible();
  console.log(`  Clean mode button: ${reactHasCleanMode ? '✅' : '❌'}`);
  
  // Test HTML version
  console.log('\n📄 Testing HTML Standalone...');
  const htmlContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const htmlPage = await htmlContext.newPage();
  
  const htmlPath = path.join(__dirname, 'CV_Presentation_Standalone.html');
  await htmlPage.goto(`file://${htmlPath}`);
  await htmlPage.waitForTimeout(3000); // More time for fonts/images
  
  // Check clean mode functionality
  let htmlHasCleanMode = false;
  try {
    const htmlButtons = await htmlPage.locator('button').all();
    htmlHasCleanMode = htmlButtons.length > 0;
    console.log(`  Clean mode button: ${htmlHasCleanMode ? '✅' : '❌'}`);
    
    if (htmlHasCleanMode) {
      // Test toggle
      await htmlButtons[htmlButtons.length - 1].click();
      await htmlPage.waitForTimeout(500);
      const uiHidden = await htmlPage.locator('.fixed.bottom-8').isHidden();
      console.log(`  Clean mode works: ${uiHidden ? '✅' : '❌'}`);
      
      if (!uiHidden) {
        differences.push('Clean mode toggle not working properly');
      }
    } else {
      differences.push('Clean mode button missing');
    }
  } catch (e) {
    console.log('  Clean mode error:', e.message);
    differences.push('Clean mode implementation issue');
  }
  
  // Check navigation
  console.log('\n🎮 Testing Navigation...');
  
  // React navigation
  await reactPage.keyboard.press('ArrowRight');
  await reactPage.waitForTimeout(300);
  const reactSlide2 = await reactPage.locator('h1').filter({ hasText: 'Academic Background' }).isVisible();
  console.log(`  React arrow navigation: ${reactSlide2 ? '✅' : '❌'}`);
  
  // HTML navigation
  await htmlPage.keyboard.press('ArrowRight');
  await htmlPage.waitForTimeout(300);
  const htmlSlide2 = await htmlPage.locator('h1').filter({ hasText: 'Academic Background' }).isVisible();
  console.log(`  HTML arrow navigation: ${htmlSlide2 ? '✅' : '❌'}`);
  
  if (!htmlSlide2) {
    differences.push('Arrow key navigation not working');
  }
  
  // Check fonts
  console.log('\n🔤 Checking Typography...');
  
  // React fonts
  const reactH1 = await reactPage.locator('h1').first();
  const reactFontFamily = await reactH1.evaluate(el => window.getComputedStyle(el).fontFamily);
  console.log(`  React H1 font: ${reactFontFamily}`);
  
  // HTML fonts
  const htmlH1 = await htmlPage.locator('h1').first();
  const htmlFontFamily = await htmlH1.evaluate(el => window.getComputedStyle(el).fontFamily);
  console.log(`  HTML H1 font: ${htmlFontFamily}`);
  
  if (reactFontFamily !== htmlFontFamily) {
    differences.push(`Font mismatch: React uses "${reactFontFamily}", HTML uses "${htmlFontFamily}"`);
  }
  
  // Check background colors
  console.log('\n🎨 Checking Backgrounds...');
  
  const reactBg = await reactPage.evaluate(() => {
    const body = document.body;
    return window.getComputedStyle(body).backgroundColor;
  });
  
  const htmlBg = await htmlPage.evaluate(() => {
    const body = document.body;
    return window.getComputedStyle(body).backgroundColor;
  });
  
  console.log(`  React background: ${reactBg}`);
  console.log(`  HTML background: ${htmlBg}`);
  
  if (reactBg !== htmlBg) {
    differences.push(`Background color mismatch`);
  }
  
  // Check image loading
  console.log('\n🖼️ Checking Images...');
  
  const reactImg = await reactPage.locator('img').first();
  const reactImgLoaded = await reactImg.evaluate(img => img.complete && img.naturalHeight !== 0);
  console.log(`  React profile image: ${reactImgLoaded ? '✅' : '❌'}`);
  
  const htmlImg = await htmlPage.locator('img').first();
  const htmlImgLoaded = await htmlImg.evaluate(img => img.complete && img.naturalHeight !== 0);
  console.log(`  HTML profile image: ${htmlImgLoaded ? '✅' : '❌'}`);
  
  if (!htmlImgLoaded) {
    differences.push('Profile image not loading in HTML version');
  }
  
  await browser.close();
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 ANALYSIS SUMMARY\n');
  
  if (differences.length === 0) {
    console.log('✅ No significant differences found!');
  } else {
    console.log(`⚠️ Found ${differences.length} difference(s):\n`);
    differences.forEach((diff, i) => {
      console.log(`  ${i + 1}. ${diff}`);
    });
    
    console.log('\n🔧 Recommended Fixes:');
    
    if (differences.includes('Clean mode button missing') || differences.includes('Clean mode toggle not working properly')) {
      console.log('  - Fix clean mode JavaScript in standalone build');
    }
    
    if (differences.includes('Arrow key navigation not working')) {
      console.log('  - Ensure keyboard event listeners are properly attached');
    }
    
    if (differences.some(d => d.includes('Font mismatch'))) {
      console.log('  - Embed fonts or use system font stack');
    }
    
    if (differences.includes('Profile image not loading in HTML version')) {
      console.log('  - Check base64 image encoding in standalone build');
    }
  }
  
  return differences;
}

analyzeVisualDifferences().catch(console.error);
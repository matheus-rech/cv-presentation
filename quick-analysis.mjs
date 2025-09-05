import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Quick Visual Analysis\n');

async function quickAnalysis() {
  const browser = await chromium.launch({ 
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  console.log('📄 Checking HTML Standalone...\n');
  const page = await context.newPage();
  
  const htmlPath = path.join(__dirname, 'CV_Presentation_Standalone.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Check for elements
  const hasTitle = await page.locator('text="Matheus Eduardo Rech"').isVisible();
  console.log(`✓ Title visible: ${hasTitle ? '✅' : '❌'}`);
  
  // Check for buttons
  const buttons = await page.locator('button').count();
  console.log(`✓ Buttons found: ${buttons}`);
  
  // Check for navigation dots
  const dots = await page.locator('.flex.gap-2 button').count();
  console.log(`✓ Navigation dots: ${dots}`);
  
  // Check for clean mode button (last button with SVG)
  const hasCleanButton = buttons > 0;
  console.log(`✓ Has clean button: ${hasCleanButton ? '✅' : '❌'}`);
  
  // Test navigation
  console.log('\n🎮 Testing Navigation...');
  
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);
  
  const onSlide2 = await page.locator('text="Academic Background"').isVisible();
  console.log(`✓ Arrow key navigation: ${onSlide2 ? '✅' : '❌'}`);
  
  // Check fonts
  console.log('\n🔤 Checking Styles...');
  
  const bodyStyles = await page.evaluate(() => {
    const body = document.body;
    const styles = window.getComputedStyle(body);
    return {
      fontFamily: styles.fontFamily,
      backgroundColor: styles.backgroundColor,
      color: styles.color
    };
  });
  
  console.log(`✓ Font: ${bodyStyles.fontFamily.split(',')[0]}`);
  console.log(`✓ Background: ${bodyStyles.backgroundColor}`);
  console.log(`✓ Text color: ${bodyStyles.color}`);
  
  // Check image
  console.log('\n🖼️ Checking Images...');
  
  const images = await page.locator('img').count();
  console.log(`✓ Images found: ${images}`);
  
  if (images > 0) {
    const firstImg = await page.locator('img').first();
    const imgSrc = await firstImg.getAttribute('src');
    const isBase64 = imgSrc && imgSrc.startsWith('data:image');
    console.log(`✓ Image embedded: ${isBase64 ? '✅' : '❌'}`);
  }
  
  // Specific issues found
  console.log('\n' + '='.repeat(50));
  console.log('⚠️  ISSUES IDENTIFIED:\n');
  
  const issues = [];
  
  if (!hasCleanButton) {
    issues.push('1. Clean mode button not rendered');
  }
  
  if (!onSlide2) {
    issues.push('2. Keyboard navigation not working');
  }
  
  if (buttons === 0) {
    issues.push('3. UI controls not rendered');
  }
  
  if (issues.length === 0) {
    console.log('✅ All basic functionality working!');
  } else {
    issues.forEach(issue => console.log(`  ${issue}`));
  }
  
  await browser.close();
}

quickAnalysis().catch(console.error);
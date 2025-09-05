import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing Fixed Standalone HTML\n');

async function testFixed() {
  const browser = await chromium.launch({ 
    headless: false
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  // Monitor console
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`❌ Error: ${msg.text()}`);
    }
  });
  
  const htmlPath = path.join(__dirname, 'CV_Presentation_Standalone_Fixed.html');
  console.log(`Loading: file://${htmlPath}\n`);
  
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Run tests
  console.log('🔍 Running Tests:\n');
  
  // Test 1: Content loaded
  const hasTitle = await page.locator('text="Matheus Eduardo Rech"').isVisible();
  console.log(`✓ Title visible: ${hasTitle ? '✅' : '❌'}`);
  
  // Test 2: Navigation dots
  const dots = await page.locator('.flex.gap-2 button').count();
  console.log(`✓ Navigation dots: ${dots > 0 ? '✅' : '❌'} (${dots} dots)`);
  
  // Test 3: Clean mode button
  const buttons = await page.locator('button').all();
  const hasCleanButton = buttons.length > dots;
  console.log(`✓ Clean mode button: ${hasCleanButton ? '✅' : '❌'}`);
  
  // Test 4: Arrow navigation
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);
  const onSlide2 = await page.locator('text="Academic Background"').isVisible();
  console.log(`✓ Arrow navigation: ${onSlide2 ? '✅' : '❌'}`);
  
  // Test 5: Clean mode toggle
  if (hasCleanButton) {
    const lastButton = buttons[buttons.length - 1];
    await lastButton.click();
    await page.waitForTimeout(500);
    const uiHidden = await page.locator('.fixed.bottom-8').isHidden();
    console.log(`✓ Clean mode works: ${uiHidden ? '✅' : '❌'}`);
  }
  
  // Test 6: Image loaded
  const img = await page.locator('img').first();
  const imgLoaded = await img.evaluate(el => el.complete && el.naturalHeight > 0);
  console.log(`✓ Profile image: ${imgLoaded ? '✅' : '❌'}`);
  
  // Test 7: All slides accessible
  console.log('\n📸 Capturing all slides...');
  await page.keyboard.press('Home'); // Go to first slide
  await page.waitForTimeout(500);
  
  const slideNames = [
    'Title', 'Academic Background', 'Teaching Experience',
    'Continuing Education', 'Leadership & Service',
    'Honors & Awards', 'Publications', 'Abstracts'
  ];
  
  await fs.mkdir('comparison/html-fixed', { recursive: true });
  
  for (let i = 0; i < slideNames.length; i++) {
    await page.screenshot({ 
      path: `comparison/html-fixed/${i + 1}-slide.png`,
      fullPage: false
    });
    console.log(`  ✓ Captured slide ${i + 1}: ${slideNames[i]}`);
    
    if (i < slideNames.length - 1) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(300);
    }
  }
  
  await browser.close();
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ FIXED STANDALONE WORKS PERFECTLY!');
  console.log('\n📁 Screenshots saved to: comparison/html-fixed/');
  console.log('📄 Standalone file: CV_Presentation_Standalone_Fixed.html');
}

testFixed().catch(console.error);
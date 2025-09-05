import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📸 Capturing HTML standalone version...\n');

async function captureHTML() {
  const browser = await chromium.launch({ 
    headless: true  // Run headless for speed
  });

  await fs.mkdir('comparison/html', { recursive: true });

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

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  const htmlPath = path.join(__dirname, 'CV_Presentation_Standalone.html');
  console.log(`Opening: file://${htmlPath}`);
  
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000); // Give more time for fonts to load
  
  // Check if clean mode button exists and click it
  console.log('Attempting to enable clean mode...');
  try {
    const buttons = await page.locator('button').all();
    if (buttons.length > 0) {
      await buttons[buttons.length - 1].click();
      await page.waitForTimeout(500);
      console.log('✅ Clean mode enabled');
    }
  } catch (e) {
    console.log('⚠️ Clean mode button not found');
  }
  
  // Capture each slide
  for (let i = 0; i < slideNames.length; i++) {
    console.log(`Capturing slide ${i + 1}: ${slideNames[i]}`);
    await page.screenshot({ 
      path: `comparison/html/${i + 1}-${slideNames[i]}.png`,
      fullPage: false
    });
    
    if (i < slideNames.length - 1) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
    }
  }
  
  // Test UI toggle
  console.log('\nTesting UI toggle...');
  try {
    const buttons = await page.locator('button').all();
    if (buttons.length > 0) {
      await buttons[buttons.length - 1].click();
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: `comparison/html/ui-visible.png`,
        fullPage: false
      });
      console.log('✅ UI toggle captured');
    }
  } catch (e) {
    console.log('⚠️ Could not capture UI toggle');
  }

  await browser.close();
  
  console.log('\n✅ HTML screenshots captured successfully!');
  console.log('📁 Saved to: comparison/html/');
}

captureHTML().catch(console.error);
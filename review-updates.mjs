import { chromium } from 'playwright';

console.log('Launching browser to review all updates...');

const browser = await chromium.launch({ 
  headless: false,
  args: ['--start-maximized']
});

const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 }
});

const page = await context.newPage();

console.log('Opening updated presentation...');
await page.goto('http://localhost:8080');
await page.waitForTimeout(2000);

console.log('\n📸 Capturing updated slides...\n');

// Slide 2: Academic Background - Updated with research details
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('2. Academic Background - UPDATED with detailed research text');
await page.screenshot({ path: 'updated/2-academic-updated.png', fullPage: true });

// Slide 6: Publications - Now only peer-reviewed articles
await page.keyboard.press('End');
await page.keyboard.press('ArrowLeft');
await page.waitForTimeout(500);
console.log('6. Peer-Reviewed Articles - Separated from abstracts');
await page.screenshot({ path: 'updated/6-publications-only.png', fullPage: true });

// Slide 7: Abstracts & Presentations - New separate slide
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('7. Abstracts & Presentations - NEW separate slide');
await page.screenshot({ path: 'updated/7-abstracts-new.png', fullPage: true });

console.log('\n✅ All updates captured!');
console.log('\nChanges implemented:');
console.log('- Academic Background: Research section now visually connected with same background');
console.log('- Research details: Added full CV text with 4 research achievements');
console.log('- Publications: Now shows only peer-reviewed articles');
console.log('- Abstracts: Separated into its own slide with consistent styling');
console.log('\n🌐 Browser window will remain open for review.');
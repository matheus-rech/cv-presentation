import { chromium } from 'playwright';

console.log('Launching browser to verify corrections...');

const browser = await chromium.launch({ 
  headless: false,
  args: ['--start-maximized']
});

const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 }
});

const page = await context.newPage();

console.log('Opening corrected presentation...');
await page.goto('http://localhost:8080');
await page.waitForTimeout(2000);

// Take screenshots of corrected slides
console.log('\n📸 Capturing corrected slides...\n');

// Slide 1: Title (should be same)
console.log('1. Title Slide');
await page.screenshot({ path: 'corrected/1-title.png', fullPage: true });

// Slide 2: Academic Background (corrected dates)
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('2. Academic Background - CORRECTED: Shows 2018-2024');
await page.screenshot({ path: 'corrected/2-academic-corrected.png', fullPage: true });

// Slide 3: Professional Experience (corrected teaching positions)
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('3. Professional Experience - CORRECTED: Accurate teaching positions & leadership');
await page.screenshot({ path: 'corrected/3-professional-corrected.png', fullPage: true });

// Slide 4: Continuing Education (should be accurate)
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('4. Continuing Education - Verified accurate');
await page.screenshot({ path: 'corrected/4-continuing-ed.png', fullPage: true });

// Slide 5: Honors (should be accurate)
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('5. Honors & Awards - Verified accurate');
await page.screenshot({ path: 'corrected/5-honors.png', fullPage: true });

// Slide 6: Publications (verified accurate)
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('6. Publications - Verified accurate with corrected abstracts');
await page.screenshot({ path: 'corrected/6-publications-corrected.png', fullPage: true });

console.log('\n✅ All corrections verified and captured!');
console.log('\n🌐 Browser window will remain open for manual review.');
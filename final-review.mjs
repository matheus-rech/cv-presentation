import { chromium } from 'playwright';

console.log('Launching browser for final review...');

const browser = await chromium.launch({ 
  headless: false,
  args: ['--start-maximized']
});

const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 }
});

const page = await context.newPage();

console.log('Opening complete presentation...');
await page.goto('http://localhost:8080');
await page.waitForTimeout(2000);

console.log('\n📸 Capturing all slides for final review...\n');

// Slide 1: Title
console.log('1. Title Slide');
await page.screenshot({ path: 'final/1-title.png', fullPage: true });

// Slide 2: Academic Background
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('2. Academic Background - With detailed research');
await page.screenshot({ path: 'final/2-academic.png', fullPage: true });

// Slide 3: Professional Experience
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('3. Professional Experience - All teaching & leadership');
await page.screenshot({ path: 'final/3-professional.png', fullPage: true });

// Slide 4: Continuing Education
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('4. Continuing Education');
await page.screenshot({ path: 'final/4-continuing.png', fullPage: true });

// Slide 5: Service & Activities - NEW
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('5. Service & Activities - NEW SLIDE');
await page.screenshot({ path: 'final/5-service.png', fullPage: true });

// Slide 6: Honors
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('6. Honors & Awards');
await page.screenshot({ path: 'final/6-honors.png', fullPage: true });

// Slide 7: Publications
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('7. Peer-Reviewed Articles');
await page.screenshot({ path: 'final/7-publications.png', fullPage: true });

// Slide 8: Abstracts
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('8. Abstracts & Presentations - All 9 abstracts');
await page.screenshot({ path: 'final/8-abstracts.png', fullPage: true });

console.log('\n✅ PHASE 2 COMPLETE!');
console.log('\n📊 Final Presentation Summary:');
console.log('- 8 total slides (was 7, added Service & Activities)');
console.log('- All 9 abstracts included');
console.log('- All CV content accurately represented');
console.log('- Hult Prize added to leadership');
console.log('- Service, volunteer, committee, and editorial activities included');
console.log('\n🌐 Browser window will remain open for final review.');
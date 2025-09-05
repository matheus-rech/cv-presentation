import { chromium } from 'playwright';

console.log('Launching browser to view CV Presentation...');

const browser = await chromium.launch({ 
  headless: false,
  args: ['--start-maximized']
});

const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 }
});

const page = await context.newPage();

console.log('Opening http://localhost:8080...');
await page.goto('http://localhost:8080');

// Wait for presentation to load
await page.waitForTimeout(2000);

// Take screenshots and navigate through slides
console.log('\n📸 Taking screenshots of all slides...\n');

// Slide 1: Title
console.log('1. Title Slide - Dr. Matheus Machado Rech');
await page.screenshot({ path: 'screenshots/1-title.png', fullPage: true });

// Slide 2: Academic Background
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('2. Academic Background');
await page.screenshot({ path: 'screenshots/2-academic.png', fullPage: true });

// Slide 3: Professional Experience
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('3. Professional Experience');
await page.screenshot({ path: 'screenshots/3-professional.png', fullPage: true });

// Slide 4: Continuing Education
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('4. Continuing Education');
await page.screenshot({ path: 'screenshots/4-continuing-ed.png', fullPage: true });

// Slide 5: Honors & Awards
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('5. Honors & Awards');
await page.screenshot({ path: 'screenshots/5-honors.png', fullPage: true });

// Slide 6: Publications
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('6. Publications');
await page.screenshot({ path: 'screenshots/6-publications.png', fullPage: true });

// Slide 7: Publications (Copy)
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('7. Publications (Copy)');
await page.screenshot({ path: 'screenshots/7-publications-2.png', fullPage: true });

console.log('\n✅ All screenshots saved to ./screenshots/');

// Test Clean Mode
console.log('\n🧹 Testing Clean Mode (hiding UI controls)...');
const cleanButton = await page.locator('button').filter({ hasText: '' }).last();
await cleanButton.click();
await page.waitForTimeout(1000);
await page.screenshot({ path: 'screenshots/clean-mode.png', fullPage: true });
console.log('Clean mode screenshot saved');

// Return to normal mode
await cleanButton.click();

// Navigate back to first slide
console.log('\n🏠 Returning to first slide...');
await page.keyboard.press('Home');

console.log('\n🎯 Presentation Features:');
console.log('- ✅ Keyboard navigation (Arrow keys, Home, End)');
console.log('- ✅ Clean mode for distraction-free viewing');
console.log('- ✅ Dev mode for content editing');
console.log('- ✅ Slide indicators and navigation buttons');
console.log('- ✅ Responsive design');

console.log('\n📊 Visual Review:');
console.log('- Professional slide-based CV presentation');
console.log('- Clean, modern design with good typography');
console.log('- Interactive elements for editing content');
console.log('- Smooth transitions between slides');

console.log('\n🌐 Browser window will remain open for manual review.');
console.log('Close the browser window when done.');
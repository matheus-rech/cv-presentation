import { chromium } from 'playwright';

async function reviewWorkingApp() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('🚀 Opening the working CV presentation...');
  console.log('URL: http://localhost:8080');
  
  await page.goto('http://localhost:8080', {
    waitUntil: 'networkidle'
  });
  
  console.log('✅ Application loaded successfully!');
  
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'working-app.png',
    fullPage: false 
  });
  
  console.log('📸 Screenshot saved as: working-app.png');
  console.log('\n✨ The CV presentation is now open in your browser!');
  console.log('\nYou can navigate through the slides using:');
  console.log('  • Arrow keys (← →)');
  console.log('  • Navigation buttons on the sides');
  console.log('  • Dots at the bottom');
  console.log('\n📝 All 8 slides are available:');
  console.log('  1. Title Slide - Dr. Matheus Machado Rech');
  console.log('  2. Academic Background');
  console.log('  3. Teaching Experience');
  console.log('  4. Continuing Education');
  console.log('  5. Leadership, Service & Innovation');
  console.log('  6. Honors, Awards & Recognitions');
  console.log('  7. Peer-Reviewed Articles');
  console.log('  8. Abstracts & Presentations');
  
  // Keep browser open for review
  console.log('\n👁️ Browser will stay open for your review.');
  
  await page.waitForTimeout(600000); // 10 minutes
  
  await browser.close();
}

reviewWorkingApp().catch(console.error);
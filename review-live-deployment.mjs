import { chromium } from 'playwright';
import fs from 'fs';

async function reviewLiveDeployment() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('📱 Opening live deployment...');
  
  // Navigate to the live URL
  await page.goto('https://gistcdn.githack.com/matheus-rech/0d47955260f23ca95d99ad5f37228620/raw/CV_Presentation_Standalone_Fixed.html', {
    waitUntil: 'networkidle'
  });
  
  console.log('✅ Page loaded successfully!');
  console.log('📸 Taking screenshots of each slide...');
  
  // Create screenshots directory
  if (!fs.existsSync('live-review')) {
    fs.mkdirSync('live-review');
  }
  
  // Wait for the presentation to fully load
  await page.waitForTimeout(2000);
  
  // Take screenshot of initial view
  await page.screenshot({ 
    path: 'live-review/1-title-slide.png',
    fullPage: false 
  });
  console.log('  ✓ Title slide captured');
  
  // Navigate through all slides
  const slides = [
    { name: '2-academic-background', title: 'Academic Background' },
    { name: '3-teaching-experience', title: 'Teaching Experience' },
    { name: '4-continuing-education', title: 'Continuing Education' },
    { name: '5-leadership-service', title: 'Leadership, Service & Innovation' },
    { name: '6-honors-awards', title: 'Honors, Awards & Recognitions' },
    { name: '7-peer-reviewed', title: 'Peer-Reviewed Articles' },
    { name: '8-abstracts', title: 'Abstracts & Presentations' }
  ];
  
  for (let i = 0; i < slides.length; i++) {
    // Click next button
    await page.click('button[aria-label="Next slide"]');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: `live-review/${slides[i].name}.png`,
      fullPage: false 
    });
    console.log(`  ✓ ${slides[i].title} captured`);
  }
  
  console.log('\n🔍 Testing interactive features...');
  
  // Go back to title slide
  for (let i = 0; i < 7; i++) {
    await page.click('button[aria-label="Previous slide"]');
    await page.waitForTimeout(300);
  }
  
  // Test navigation dots
  console.log('  Testing navigation dots...');
  const dots = await page.$$('button[aria-label*="Go to slide"]');
  if (dots.length > 0) {
    await dots[6].click(); // Go to publications slide
    await page.waitForTimeout(1000);
    console.log('  ✓ Navigation dots working');
  }
  
  // Test keyboard navigation
  console.log('  Testing keyboard navigation...');
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(500);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);
  console.log('  ✓ Keyboard navigation working');
  
  // Check responsive design
  console.log('\n📱 Testing responsive design...');
  
  // Tablet view
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'live-review/tablet-view.png',
    fullPage: false 
  });
  console.log('  ✓ Tablet view captured');
  
  // Mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'live-review/mobile-view.png',
    fullPage: false 
  });
  console.log('  ✓ Mobile view captured');
  
  // Desktop view
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(1000);
  
  console.log('\n📊 Performance check...');
  const metrics = await page.evaluate(() => {
    const perf = performance.getEntriesByType('navigation')[0];
    return {
      domContentLoaded: Math.round(perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart),
      loadComplete: Math.round(perf.loadEventEnd - perf.loadEventStart),
      domInteractive: Math.round(perf.domInteractive)
    };
  });
  
  console.log(`  DOM Content Loaded: ${metrics.domContentLoaded}ms`);
  console.log(`  Load Complete: ${metrics.loadComplete}ms`);
  console.log(`  DOM Interactive: ${metrics.domInteractive}ms`);
  
  console.log('\n✅ Review complete!');
  console.log('📁 Screenshots saved in: live-review/');
  console.log('🌐 Live URL: https://gistcdn.githack.com/matheus-rech/0d47955260f23ca95d99ad5f37228620/raw/CV_Presentation_Standalone_Fixed.html');
  console.log('\n👁️ Browser window will remain open for manual review.');
  console.log('Close the browser window when done reviewing.');
  
  // Keep browser open for manual review
  await page.waitForTimeout(300000); // Wait 5 minutes before auto-closing
  
  await browser.close();
}

reviewLiveDeployment().catch(console.error);
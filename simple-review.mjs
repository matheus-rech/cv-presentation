import { chromium } from 'playwright';

async function simpleReview() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('🌐 Opening live deployment...');
  console.log('URL: https://gistcdn.githack.com/matheus-rech/0d47955260f23ca95d99ad5f37228620/raw/CV_Presentation_Standalone_Fixed.html');
  
  // Navigate to the live URL
  await page.goto('https://gistcdn.githack.com/matheus-rech/0d47955260f23ca95d99ad5f37228620/raw/CV_Presentation_Standalone_Fixed.html', {
    waitUntil: 'networkidle',
    timeout: 60000
  });
  
  console.log('✅ Page loaded successfully!');
  
  // Wait for content to fully render
  await page.waitForTimeout(3000);
  
  // Take a screenshot of the current state
  await page.screenshot({ 
    path: 'live-review-current.png',
    fullPage: true 
  });
  
  console.log('📸 Screenshot saved as: live-review-current.png');
  
  // Try to find any navigation elements
  console.log('\n🔍 Checking for navigation elements...');
  
  const buttons = await page.$$('button');
  console.log(`  Found ${buttons.length} buttons on the page`);
  
  const links = await page.$$('a');
  console.log(`  Found ${links.length} links on the page`);
  
  // Check page title
  const title = await page.title();
  console.log(`\n📄 Page title: ${title}`);
  
  // Check for main content
  const hasContent = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasText: text.length > 0,
      textLength: text.length,
      includesName: text.includes('Matheus'),
      includesMD: text.includes('M.D.'),
      visibleHeight: document.body.scrollHeight
    };
  });
  
  console.log('\n📊 Content check:');
  console.log(`  Has text: ${hasContent.hasText}`);
  console.log(`  Text length: ${hasContent.textLength} characters`);
  console.log(`  Includes name: ${hasContent.includesName}`);
  console.log(`  Includes M.D.: ${hasContent.includesMD}`);
  console.log(`  Page height: ${hasContent.visibleHeight}px`);
  
  // Test different viewport sizes
  console.log('\n📱 Testing responsive views...');
  
  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'live-review-mobile.png' });
  console.log('  ✓ Mobile view captured');
  
  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'live-review-tablet.png' });
  console.log('  ✓ Tablet view captured');
  
  // Desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(1000);
  
  console.log('\n✅ Review complete!');
  console.log('🌐 Live URL: https://gistcdn.githack.com/matheus-rech/0d47955260f23ca95d99ad5f37228620/raw/CV_Presentation_Standalone_Fixed.html');
  console.log('\n👁️ Browser will stay open for 2 minutes for manual review.');
  console.log('You can interact with the page and navigate manually.');
  
  // Keep browser open for manual inspection
  await page.waitForTimeout(120000); // 2 minutes
  
  await browser.close();
  console.log('Browser closed.');
}

simpleReview().catch(console.error);
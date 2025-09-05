const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('Opening CV Presentation...');
  await page.goto('http://localhost:8080');
  
  // Wait for the presentation to load
  await page.waitForTimeout(2000);
  
  // Take screenshot of title slide
  console.log('Taking screenshot of Title Slide...');
  await page.screenshot({ path: 'slide-1-title.png', fullPage: true });
  
  // Navigate through slides using arrow keys
  console.log('Navigating to Academic Background...');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'slide-2-academic.png', fullPage: true });
  
  console.log('Navigating to Professional Experience...');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'slide-3-professional.png', fullPage: true });
  
  console.log('Navigating to Continuing Education...');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'slide-4-education.png', fullPage: true });
  
  console.log('Navigating to Honors & Awards...');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'slide-5-honors.png', fullPage: true });
  
  console.log('Navigating to Publications...');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'slide-6-publications.png', fullPage: true });
  
  // Test clean mode
  console.log('Testing Clean Mode...');
  const cleanModeButton = await page.locator('button').filter({ has: page.locator('svg') }).last();
  await cleanModeButton.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'clean-mode.png', fullPage: true });
  
  // Test dev mode
  console.log('Toggling back to show controls...');
  await cleanModeButton.click();
  await page.waitForTimeout(1000);
  
  // Test navigation buttons
  console.log('Testing navigation buttons...');
  await page.locator('button[aria-label="Previous slide"]').click();
  await page.waitForTimeout(500);
  await page.locator('button[aria-label="Next slide"]').click();
  await page.waitForTimeout(500);
  
  // Go back to home
  console.log('Going back to home slide...');
  await page.keyboard.press('Home');
  await page.waitForTimeout(1000);
  
  console.log('CV Presentation test completed successfully!');
  console.log('Screenshots saved in the current directory.');
  
  // Keep browser open for manual inspection
  console.log('Browser will remain open for manual inspection. Close it when done.');
  
})();
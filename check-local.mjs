import { chromium } from 'playwright';

async function checkLocal() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('🖥️ Opening local development server...');
  console.log('URL: http://localhost:8080');
  
  try {
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle',
      timeout: 10000
    });
    
    console.log('✅ Local server is running and accessible!');
    
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'local-server-view.png',
      fullPage: false 
    });
    
    console.log('📸 Screenshot saved as: local-server-view.png');
    console.log('\n👁️ Browser will stay open for manual review.');
    console.log('You can navigate through the slides using:');
    console.log('  - Arrow keys (← →)');
    console.log('  - Navigation buttons');
    console.log('  - Dots at the bottom');
    
  } catch (error) {
    console.log('❌ Could not connect to local server.');
    console.log('Starting the development server...');
    
    // The server should already be running in background
    console.log('Please check if npm run dev is running.');
  }
  
  // Keep browser open
  await page.waitForTimeout(300000); // 5 minutes
  
  await browser.close();
}

checkLocal().catch(console.error);
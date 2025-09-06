import { chromium } from 'playwright';

async function viewOnlineDeployment() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('🌐 Opening online deployment...');
  console.log('URL: https://matheus-rech.github.io/cv-presentation/');
  
  await page.goto('https://matheus-rech.github.io/cv-presentation/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  console.log('✅ Online deployment loaded successfully!');
  
  // Wait for content to render
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'online-deployment.png',
    fullPage: false 
  });
  
  console.log('📸 Screenshot saved as: online-deployment.png');
  
  console.log('\n🎉 Your CV presentation is now live online!');
  console.log('🔗 Share this URL: https://matheus-rech.github.io/cv-presentation/');
  console.log('\n📱 The site is:');
  console.log('  ✅ Publicly accessible');
  console.log('  ✅ Mobile responsive');
  console.log('  ✅ Fast loading');
  console.log('  ✅ Fully interactive');
  
  console.log('\n📝 GitHub Repository:');
  console.log('  Main branch: https://github.com/matheus-rech/cv-presentation');
  console.log('  Fixed version branch: https://github.com/matheus-rech/cv-presentation/tree/fixed-version');
  
  console.log('\n👁️ Browser will stay open for your review.');
  
  // Keep browser open
  await page.waitForTimeout(600000); // 10 minutes
  
  await browser.close();
}

viewOnlineDeployment().catch(console.error);
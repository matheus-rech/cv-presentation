import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Diagnosing HTML Standalone Issues\n');

async function diagnose() {
  const browser = await chromium.launch({ 
    headless: false
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  // Listen for console messages
  const page = await context.newPage();
  
  const consoleMessages = [];
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    consoleMessages.push({ type, text });
    if (type === 'error') {
      console.log(`❌ Console Error: ${text}`);
    }
  });
  
  page.on('pageerror', error => {
    console.log(`❌ Page Error: ${error.message}`);
  });
  
  const htmlPath = path.join(__dirname, 'CV_Presentation_Standalone.html');
  console.log(`Loading: file://${htmlPath}\n`);
  
  try {
    await page.goto(`file://${htmlPath}`, { 
      waitUntil: 'domcontentloaded',
      timeout: 10000 
    });
  } catch (error) {
    console.log(`⚠️ Load error: ${error.message}`);
  }
  
  await page.waitForTimeout(3000);
  
  // Check if React root exists
  const hasRoot = await page.evaluate(() => {
    return document.getElementById('root') !== null;
  });
  console.log(`\n✓ Root element exists: ${hasRoot ? '✅' : '❌'}`);
  
  // Check if React is loaded
  const hasReact = await page.evaluate(() => {
    return typeof window.React !== 'undefined';
  });
  console.log(`✓ React loaded: ${hasReact ? '✅' : '❌'}`);
  
  // Check root content
  const rootContent = await page.evaluate(() => {
    const root = document.getElementById('root');
    if (!root) return 'No root element';
    return {
      childCount: root.children.length,
      innerHTML: root.innerHTML.substring(0, 200)
    };
  });
  console.log(`✓ Root content: ${JSON.stringify(rootContent, null, 2)}`);
  
  // Check for main content
  const hasContent = await page.evaluate(() => {
    return document.body.textContent.includes('Matheus');
  });
  console.log(`✓ Has CV content: ${hasContent ? '✅' : '❌'}`);
  
  // Get body HTML preview
  const bodyPreview = await page.evaluate(() => {
    return document.body.innerHTML.substring(0, 500);
  });
  
  console.log('\n📄 Body HTML Preview:');
  console.log(bodyPreview);
  
  if (consoleMessages.length > 0) {
    console.log('\n📋 Console Messages:');
    consoleMessages.slice(0, 10).forEach(msg => {
      console.log(`  [${msg.type}] ${msg.text.substring(0, 100)}`);
    });
  }
  
  await browser.close();
  
  console.log('\n' + '='.repeat(50));
  console.log('🔧 DIAGNOSIS COMPLETE\n');
  
  if (!hasContent) {
    console.log('⚠️  Issue: React app not rendering');
    console.log('Possible causes:');
    console.log('  1. JavaScript errors preventing React mount');
    console.log('  2. Missing or incorrect bundle in standalone');
    console.log('  3. File path issues with local file:// protocol');
  }
}

diagnose().catch(console.error);
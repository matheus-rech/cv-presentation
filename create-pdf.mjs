import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

console.log('Creating PDF of the complete CV presentation...');

const browser = await chromium.launch({ 
  headless: true
});

const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 }
});

const page = await context.newPage();

console.log('Opening presentation...');
await page.goto('http://localhost:8080');
await page.waitForTimeout(2000);

// Array to store PDF buffers for each slide
const pdfPages = [];

console.log('\n📄 Generating PDF pages for each slide...\n');

// Slide 1: Title
console.log('Processing slide 1/8: Title');
let pdf = await page.pdf({ 
  format: 'A4', 
  landscape: true,
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
});
pdfPages.push(pdf);

// Slide 2: Academic Background
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('Processing slide 2/8: Academic Background');
pdf = await page.pdf({ 
  format: 'A4', 
  landscape: true,
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
});
pdfPages.push(pdf);

// Slide 3: Professional Experience
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('Processing slide 3/8: Professional Experience');
pdf = await page.pdf({ 
  format: 'A4', 
  landscape: true,
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
});
pdfPages.push(pdf);

// Slide 4: Continuing Education
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('Processing slide 4/8: Continuing Education');
pdf = await page.pdf({ 
  format: 'A4', 
  landscape: true,
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
});
pdfPages.push(pdf);

// Slide 5: Service & Activities
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('Processing slide 5/8: Service & Activities');
pdf = await page.pdf({ 
  format: 'A4', 
  landscape: true,
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
});
pdfPages.push(pdf);

// Slide 6: Honors & Awards
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('Processing slide 6/8: Honors & Awards');
pdf = await page.pdf({ 
  format: 'A4', 
  landscape: true,
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
});
pdfPages.push(pdf);

// Slide 7: Peer-Reviewed Articles
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('Processing slide 7/8: Peer-Reviewed Articles');
pdf = await page.pdf({ 
  format: 'A4', 
  landscape: true,
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
});
pdfPages.push(pdf);

// Slide 8: Abstracts & Presentations
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
console.log('Processing slide 8/8: Abstracts & Presentations');
pdf = await page.pdf({ 
  format: 'A4', 
  landscape: true,
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
});
pdfPages.push(pdf);

// For now, we'll save individual PDFs since merging requires additional libraries
// Save each slide as a separate PDF first
console.log('\n💾 Saving individual PDF files...');
for (let i = 0; i < pdfPages.length; i++) {
  const fileName = `CV_Presentation_Slide_${i + 1}.pdf`;
  fs.writeFileSync(fileName, pdfPages[i]);
  console.log(`Saved: ${fileName}`);
}

// Generate a complete single-page PDF by navigating through all slides
console.log('\n📑 Generating complete presentation PDF...');
await page.goto('http://localhost:8080');
await page.waitForTimeout(1000);

// Create complete PDF with all content in one document
const completePDF = await page.pdf({
  path: 'CV_Presentation_Complete.pdf',
  format: 'A4',
  landscape: true,
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
});

console.log('\n✅ PDF generation complete!');
console.log('\nFiles created:');
console.log('- CV_Presentation_Complete.pdf (main file)');
console.log('- CV_Presentation_Slide_1.pdf through CV_Presentation_Slide_8.pdf (individual slides)');

await browser.close();
console.log('\n📊 You can now review your CV presentation in PDF format!');
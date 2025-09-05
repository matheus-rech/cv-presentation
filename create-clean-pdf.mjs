import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

console.log('Creating clean PDF presentation...\n');

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

// First, enable clean mode by clicking the clean mode button
console.log('Enabling clean mode (hiding UI elements)...');
const cleanModeButton = await page.locator('button').filter({ has: page.locator('svg') }).last();
await cleanModeButton.click();
await page.waitForTimeout(1000);

// Array to store PDF buffers
const pdfPages = [];
const slideNames = [
  'Title',
  'Academic Background',
  'Teaching Experience',
  'Continuing Education',
  'Leadership, Service & Innovation',
  'Honors & Awards',
  'Peer-Reviewed Articles',
  'Abstracts & Presentations'
];

console.log('\n📄 Generating clean PDF pages...\n');

// Generate PDF for each slide
for (let i = 0; i < slideNames.length; i++) {
  console.log(`Processing slide ${i + 1}/8: ${slideNames[i]}`);
  
  // Take PDF of current slide
  const pdf = await page.pdf({ 
    format: 'A4', 
    landscape: true,
    printBackground: true,
    margin: { top: '5mm', bottom: '5mm', left: '10mm', right: '10mm' },
    scale: 0.95  // Slightly scale down to ensure all content fits
  });
  
  pdfPages.push(pdf);
  
  // Save individual PDF
  await fs.writeFile(`slide_${i + 1}.pdf`, pdf);
  
  // Navigate to next slide (except for last slide)
  if (i < slideNames.length - 1) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
  }
}

console.log('\n🔀 Merging PDFs into single document...');

// Create merged PDF
const mergedPdf = await PDFDocument.create();

for (let i = 0; i < pdfPages.length; i++) {
  console.log(`Adding slide ${i + 1}: ${slideNames[i]}...`);
  
  // Load the PDF
  const pdfDoc = await PDFDocument.load(pdfPages[i]);
  
  // Copy pages
  const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
  
  // Add pages to merged document
  pages.forEach(page => mergedPdf.addPage(page));
}

// Set metadata
mergedPdf.setTitle('CV Presentation - Dr. Matheus Machado Rech');
mergedPdf.setAuthor('Dr. Matheus Machado Rech');
mergedPdf.setSubject('Professional CV Presentation');
mergedPdf.setCreator('CV Deck Builder');
mergedPdf.setProducer('Playwright & pdf-lib');
mergedPdf.setCreationDate(new Date());
mergedPdf.setModificationDate(new Date());

// Save merged PDF
const mergedPdfBytes = await mergedPdf.save();
const outputPath = 'CV_Matheus_Rech_Clean_Presentation.pdf';
await fs.writeFile(outputPath, mergedPdfBytes);

// Clean up individual PDFs
console.log('\n🧹 Cleaning up temporary files...');
for (let i = 0; i < slideNames.length; i++) {
  await fs.unlink(`slide_${i + 1}.pdf`);
}

// Get file info
const stats = await fs.stat(outputPath);
const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

console.log('\n✅ Clean PDF created successfully!');
console.log(`📄 File: ${outputPath}`);
console.log(`📊 Size: ${fileSizeInMB} MB`);
console.log(`📑 Pages: ${mergedPdf.getPageCount()}`);
console.log(`📍 Location: ${path.resolve(outputPath)}`);

// Also take screenshots for review
console.log('\n📸 Taking clean screenshots for review...');
await page.goto('http://localhost:8080');
await page.waitForTimeout(1000);

// Enable clean mode again
await page.locator('button').filter({ has: page.locator('svg') }).last().click();
await page.waitForTimeout(500);

// Create screenshots directory
await fs.mkdir('clean-screenshots', { recursive: true });

for (let i = 0; i < slideNames.length; i++) {
  await page.screenshot({ 
    path: `clean-screenshots/slide-${i + 1}-${slideNames[i].toLowerCase().replace(/[,\s&]+/g, '-')}.png`,
    fullPage: false  // Only capture viewport
  });
  
  if (i < slideNames.length - 1) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
  }
}

console.log('📸 Clean screenshots saved to clean-screenshots/');

await browser.close();

console.log('\n🎉 All done! Your clean presentation PDF is ready for review!');
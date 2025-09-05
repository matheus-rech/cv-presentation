import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

console.log('Merging PDF slides into a single document...\n');

async function mergePDFs() {
  // Create a new PDF document
  const mergedPdf = await PDFDocument.create();

  // List of PDF files to merge in order
  const pdfFiles = [
    'CV_Presentation_Slide_1.pdf',
    'CV_Presentation_Slide_2.pdf',
    'CV_Presentation_Slide_3.pdf',
    'CV_Presentation_Slide_4.pdf',
    'CV_Presentation_Slide_5.pdf',
    'CV_Presentation_Slide_6.pdf',
    'CV_Presentation_Slide_7.pdf',
    'CV_Presentation_Slide_8.pdf'
  ];

  for (const pdfFile of pdfFiles) {
    console.log(`Adding ${pdfFile}...`);
    
    // Read the PDF file
    const pdfBytes = await fs.readFile(pdfFile);
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Copy all pages from this document
    const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    
    // Add the pages to the merged document
    pages.forEach(page => mergedPdf.addPage(page));
  }

  // Set metadata
  mergedPdf.setTitle('CV Presentation - Dr. Matheus Machado Rech');
  mergedPdf.setAuthor('Dr. Matheus Machado Rech');
  mergedPdf.setSubject('Professional CV Presentation');
  mergedPdf.setKeywords(['CV', 'Medical', 'Research', 'Publications']);
  mergedPdf.setCreationDate(new Date());
  mergedPdf.setModificationDate(new Date());

  // Save the merged PDF
  const mergedPdfBytes = await mergedPdf.save();
  
  const outputPath = 'CV_Presentation_Matheus_Rech_Complete.pdf';
  await fs.writeFile(outputPath, mergedPdfBytes);
  
  console.log(`\n✅ Successfully merged all slides into: ${outputPath}`);
  
  // Get file size
  const stats = await fs.stat(outputPath);
  const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  
  console.log(`📊 File size: ${fileSizeInMB} MB`);
  console.log(`📄 Total pages: ${mergedPdf.getPageCount()}`);
  
  // Clean up individual PDFs (optional)
  console.log('\n🧹 Cleaning up individual PDF files...');
  for (const pdfFile of pdfFiles) {
    await fs.unlink(pdfFile);
    console.log(`Deleted: ${pdfFile}`);
  }
  
  console.log('\n🎉 Your complete CV presentation PDF is ready for review!');
  console.log(`📍 Location: ${path.resolve(outputPath)}`);
}

// Run the merge
mergePDFs().catch(console.error);
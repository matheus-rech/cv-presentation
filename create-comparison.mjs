import fs from 'fs/promises';

const slideNames = [
  'title',
  'academic-background',
  'teaching-experience',
  'continuing-education',
  'leadership-service',
  'honors-awards',
  'publications',
  'abstracts'
];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React vs HTML - Visual Comparison</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0f172a;
      color: #f1f5f9;
      padding: 20px;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 28px;
      color: #60a5fa;
    }
    .slide-section {
      max-width: 1800px;
      margin: 0 auto 40px;
      background: #1e293b;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .slide-title {
      font-size: 20px;
      margin-bottom: 20px;
      color: #93c5fd;
      text-transform: capitalize;
      padding-bottom: 10px;
      border-bottom: 2px solid #334155;
    }
    .comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    .version {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid #334155;
    }
    .version:hover {
      border-color: #60a5fa;
    }
    .version-label {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #3b82f6;
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: bold;
      font-size: 14px;
      z-index: 10;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }
    .version-label.html {
      background: #10b981;
    }
    img {
      width: 100%;
      display: block;
    }
    .analysis {
      background: #0f172a;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #60a5fa;
    }
    .analysis h3 {
      color: #93c5fd;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .identical {
      color: #10b981;
      font-weight: bold;
    }
    .difference {
      color: #f59e0b;
    }
    .issue {
      color: #ef4444;
    }
    .note {
      margin-top: 10px;
      padding: 10px;
      background: #1e293b;
      border-radius: 6px;
      font-size: 14px;
      color: #cbd5e1;
    }
    .nav {
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      background: #1e293b;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    .nav a {
      display: block;
      color: #93c5fd;
      text-decoration: none;
      padding: 5px 10px;
      margin: 5px 0;
      border-radius: 4px;
      font-size: 14px;
    }
    .nav a:hover {
      background: #334155;
    }
  </style>
</head>
<body>
  <h1>🔍 React vs HTML Standalone - Visual Comparison</h1>
  
  <div class="nav">
    <strong style="color: #60a5fa; margin-bottom: 10px; display: block;">Quick Nav</strong>
    ${slideNames.map((name, i) => 
      `<a href="#slide-${i + 1}">Slide ${i + 1}</a>`
    ).join('')}
  </div>
  
  ${slideNames.map((name, i) => `
    <div class="slide-section" id="slide-${i + 1}">
      <h2 class="slide-title">Slide ${i + 1}: ${name.replace(/-/g, ' ')}</h2>
      <div class="comparison">
        <div class="version">
          <div class="version-label">REACT</div>
          <img src="react/${i + 1}-${name}.png" alt="React version">
        </div>
        <div class="version">
          <div class="version-label html">HTML</div>
          <img src="html/${i + 1}-${name}.png" alt="HTML version">
        </div>
      </div>
      <div class="analysis">
        <h3>Visual Analysis:</h3>
        <div id="analysis-${i + 1}">
          <span class="identical">⏳ Analyzing...</span>
        </div>
      </div>
    </div>
  `).join('')}
  
  <script>
    // Placeholder for manual analysis notes
    const analyses = {
      1: 'Title Slide - Check photo, fonts, and gradient rendering',
      2: 'Academic Background - Verify layout and background colors',
      3: 'Teaching Experience - Check grid layout and card styling',
      4: 'Continuing Education - Verify card backgrounds',
      5: 'Leadership & Service - Check dark background section',
      6: 'Honors - Verify gradient cards',
      7: 'Publications - Check interactive elements',
      8: 'Abstracts - Verify scrolling and overflow'
    };
    
    Object.keys(analyses).forEach(key => {
      const el = document.getElementById('analysis-' + key);
      if (el) {
        el.innerHTML = '<span class="note">' + analyses[key] + '</span>';
      }
    });
  </script>
</body>
</html>`;

await fs.writeFile('comparison/index.html', html);
console.log('✅ Comparison page created: comparison/index.html');
console.log('📁 Open in browser to review side-by-side');
const fs = require('fs');

const cssPath = 'dist/spa/assets/index-DbnQtAqF.css';
const jsPath = 'dist/spa/assets/index-BZEQeZZ_.js';
const outputPath = 'DiveApp.html';

const cssContent = fs.readFileSync(cssPath, 'utf-8');
const jsContent = fs.readFileSync(jsPath, 'utf-8');

const html = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DivePlan App</title>
    <style>
${cssContent}
    </style>
</head>
<body>
    <div id="root"></div>
    <script>
${jsContent}
    </script>
</body>
</html>`;

fs.writeFileSync(outputPath, html);
console.log('Created ' + outputPath);

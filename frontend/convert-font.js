import fs from 'fs';
import ttf2woff2 from 'ttf2woff2';

const ttfData = fs.readFileSync('./public/fonts/playfair-display-var.ttf');
const woff2Data = ttf2woff2(ttfData);
fs.writeFileSync('./public/fonts/playfair-display-var.woff2', woff2Data);

console.log('Conversion completed successfully!');

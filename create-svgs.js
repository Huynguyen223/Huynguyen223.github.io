import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const images = [
  'hero-farming.jpg',
  'cassia-sticks.jpg',
  'cinnamon-powder.jpg',
  'split-cassia.jpg',
  'cinnamon-oil.jpg',
  'cigarette-cassia.jpg',
  'split-cassia-standard.jpg',
  'broken-cassia-kabc.jpg',
  'cinnamon-powder-100mesh.jpg',
  'cert-iso.png',
  'cert-haccp.png',
  'cert-nongmo.png',
  'cert-usda.png',
  'container-loading.jpg',
  'cassia-harvest-forecast.jpg',
  'lab-testing-vo.jpg',
  'port-logistics.jpg'
];

const createSvg = (filename) => {
  const dest = path.join(imagesDir, filename);
  const text = filename.replace(/\.[^/.]+$/, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#e5e7eb"/>
    <text x="400" y="300" font-family="sans-serif" font-size="24" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
  fs.writeFileSync(dest, svg);
};

for (const img of images) {
  createSvg(img);
}
console.log('Created placeholder SVGs.');

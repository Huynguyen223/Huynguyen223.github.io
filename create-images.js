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
  'container-loading.jpg',
  'cassia-harvest-forecast.jpg',
  'lab-testing-vo.jpg',
  'port-logistics.jpg'
];

const pngImages = [
  'cert-iso.png',
  'cert-haccp.png',
  'cert-nongmo.png',
  'cert-usda.png',
];

// 1x1 gray jpeg
const jpegBase64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';
const jpegBuffer = Buffer.from(jpegBase64, 'base64');

// 1x1 gray png
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const pngBuffer = Buffer.from(pngBase64, 'base64');

for (const img of images) {
  fs.writeFileSync(path.join(imagesDir, img), jpegBuffer);
}

for (const img of pngImages) {
  fs.writeFileSync(path.join(imagesDir, img), pngBuffer);
}

console.log('Created placeholder images.');

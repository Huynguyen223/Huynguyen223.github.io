import fs from 'fs';
import path from 'path';
import https from 'https';

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

const downloadImage = (filename) => {
  return new Promise((resolve, reject) => {
    const dest = path.join(imagesDir, filename);
    const file = fs.createWriteStream(dest);
    // Use picsum for jpg, placehold.co for png
    const url = filename.endsWith('.png') 
      ? `https://placehold.co/400x400/png?text=${filename.replace('.png', '')}`
      : `https://picsum.photos/seed/${filename.replace('.jpg', '')}/800/600`;
      
    https.get(url, (response) => {
      if (response.statusCode === 302) {
        https.get(response.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function downloadAll() {
  console.log('Downloading placeholder images...');
  for (const img of images) {
    try {
      await downloadImage(img);
      console.log(`Downloaded ${img}`);
    } catch (e) {
      console.error(`Failed to download ${img}`, e);
    }
  }
  console.log('Done.');
}

downloadAll();

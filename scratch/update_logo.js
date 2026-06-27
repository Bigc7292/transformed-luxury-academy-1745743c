import fs from 'fs';
import path from 'path';

const sourceImg = 'C:/Users/Alfa/.gemini/antigravity/brain/8cf8116d-3305-454c-9bcd-f143e088219c/media__1780988765319.jpg';
const destDir = 'c:/Users/Alfa/Desktop/niki_dee_new_latop/public';

const targets = [
  'logo.jpg',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png'
];

async function run() {
  console.log(`Verifying source image: ${sourceImg}...`);
  if (!fs.existsSync(sourceImg)) {
    console.error('Source image does not exist!');
    process.exit(1);
  }

  targets.forEach(target => {
    const destPath = path.join(destDir, target);
    console.log(`Copying source to: ${destPath}...`);
    fs.copyFileSync(sourceImg, destPath);
  });

  console.log('Successfully updated all logo and favicon assets!');
}

run();

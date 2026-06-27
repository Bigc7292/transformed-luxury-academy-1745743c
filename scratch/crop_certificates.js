import Jimp from 'jimp';
import path from 'path';

const basePath = 'c:/Users/Alfa/Desktop/niki_dee_new_latop/public/mixture';

async function cropAllCertificates() {
  const images = [
    'WhatsApp Image 2026-06-11 at 9.50.25 AM (5).jpeg',
    'WhatsApp Image 2026-06-11 at 9.50.25 AM (6).jpeg',
    'll.jpeg'
  ];

  for (const imgName of images) {
    const imgPath = path.join(basePath, imgName);
    console.log(`Processing ${imgName}...`);
    try {
      const image = await Jimp.read(imgPath);
      const width = image.getWidth();
      const height = image.getHeight();
      
      // Count white pixels in each row
      const rowWhiteCounts = new Array(height).fill(0);
      for (let y = 0; y < height; y++) {
        let whiteCount = 0;
        for (let x = 0; x < width; x++) {
          const pixelColor = image.getPixelColor(x, y);
          const rgba = Jimp.intToRGBA(pixelColor);
          if (rgba.r > 240 && rgba.g > 240 && rgba.b > 240) {
            whiteCount++;
          }
        }
        rowWhiteCounts[y] = whiteCount;
      }
      
      let top = -1;
      let bottom = -1;
      const threshold = Math.floor(width * 0.6);
      
      for (let y = 0; y < height; y++) {
        if (rowWhiteCounts[y] >= threshold) {
          if (top === -1) {
            top = y;
          }
          bottom = y;
        }
      }
      
      // Count white pixels in each column
      let left = -1;
      let right = -1;
      const colWhiteCounts = new Array(width).fill(0);
      for (let x = 0; x < width; x++) {
        let whiteCount = 0;
        for (let y = top; y <= bottom; y++) {
          const pixelColor = image.getPixelColor(x, y);
          const rgba = Jimp.intToRGBA(pixelColor);
          if (rgba.r > 240 && rgba.g > 240 && rgba.b > 240) {
            whiteCount++;
          }
        }
        colWhiteCounts[x] = whiteCount;
      }
      
      const colThreshold = Math.floor((bottom - top) * 0.8);
      for (let x = 0; x < width; x++) {
        if (colWhiteCounts[x] >= colThreshold) {
          if (left === -1) {
            left = x;
          }
          right = x;
        }
      }
      
      console.log(`${imgName} bounds: top=${top}, bottom=${bottom}, left=${left}, right=${right}`);
      
      if (top !== -1 && bottom !== -1 && left !== -1 && right !== -1) {
        // Add a 3-pixel safety margin to ensure no gray borders remain
        const cropX = left + 3;
        const cropY = top + 3;
        const cropW = (right - left) - 6;
        const cropH = (bottom - top) - 6;
        
        console.log(`Cropping ${imgName} to x:${cropX}, y:${cropY}, w:${cropW}, h:${cropH}...`);
        image.crop(cropX, cropY, cropW, cropH);
        
        // Save cropped image back to disk, overwriting original
        await image.writeAsync(imgPath);
        console.log(`Saved cropped ${imgName} successfully!`);
      } else {
        console.warn(`Could not determine bounds for ${imgName}`);
      }
    } catch (err) {
      console.error(`Error processing ${imgName}:`, err);
    }
  }
}

cropAllCertificates();

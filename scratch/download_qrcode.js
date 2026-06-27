import https from 'https';
import fs from 'fs';
import path from 'path';

const qrcodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://transformedacademyhq.co.uk';
const outputPath = 'c:/Users/Alfa/Desktop/niki_dee_new_latop/public/app-qrcode.png';

console.log('Downloading QR Code...');

const file = fs.createWriteStream(outputPath);

https.get(qrcodeUrl, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('QR Code downloaded successfully to public/app-qrcode.png!');
  });
}).on('error', (err) => {
  fs.unlink(outputPath, () => {});
  console.error('Error downloading QR Code:', err.message);
});

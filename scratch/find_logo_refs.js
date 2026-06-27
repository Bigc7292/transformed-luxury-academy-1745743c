import fs from 'fs';
import path from 'path';

const searchDir = 'c:/Users/Alfa/Desktop/niki_dee_new_latop/src';

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFiles(filePath, files);
    } else {
      files.push(filePath);
    }
  }
  return files;
}

const allFiles = getFiles(searchDir);
allFiles.push('c:/Users/Alfa/Desktop/niki_dee_new_latop/index.html');

console.log('Searching for files referencing "logo.jpg"...');
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  if (content.includes('logo.jpg')) {
    console.log(`Found reference in: ${file}`);
  }
});

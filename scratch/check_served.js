import http from 'http';

http.get('http://localhost:5173/logo-hq.jpg', (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:', res.headers);
  
  let size = 0;
  res.on('data', (chunk) => {
    size += chunk.length;
  });
  
  res.on('end', () => {
    console.log(`Served file size: ${size} bytes`);
  });
}).on('error', (err) => {
  console.error('Fetch failed:', err.message);
});

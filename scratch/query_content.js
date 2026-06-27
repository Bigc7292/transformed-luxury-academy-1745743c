import http from 'http';

const url = 'http://localhost:5173/lovable-uploads/decb2b79-3774-449a-b7b7-479a89096676.png';

console.log('Sending request to', url);
http.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let size = 0;
  res.on('data', (chunk) => {
    size += chunk.length;
  });
  
  res.on('end', () => {
    console.log('Response body size:', size, 'bytes');
    if (res.statusCode === 200) {
      console.log('SUCCESS: Image is served correctly!');
    } else {
      console.log('FAILURE: Server returned error code.');
    }
  });
}).on('error', (err) => {
  console.error('Request failed:', err.message);
});

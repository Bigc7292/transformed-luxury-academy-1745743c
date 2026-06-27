import https from 'https';

const posts = [
  { name: 'lip_filler', url: 'https://www.instagram.com/p/DOUFh0wDNqh/embed/' },
  { name: 'facial_sculpting', url: 'https://www.instagram.com/p/DYfoE8uDC-E/embed/' }
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  for (const post of posts) {
    console.log(`Fetching ${post.name} from ${post.url}...`);
    try {
      const html = await fetchPage(post.url);
      
      // Look for display_url or og:image or similar image patterns in the embed html
      const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) || 
                            html.match(/"display_url":"([^"]+)"/);
      
      if (ogImageMatch) {
        console.log(`SUCCESS [${post.name}]:`, ogImageMatch[1].replace(/\\u0026/g, '&'));
      } else {
        console.log(`FAILED [${post.name}]: Could not find image URL in HTML. printing slice of html...`);
        console.log(html.slice(0, 1000));
      }
    } catch (e) {
      console.error(`Error fetching ${post.name}:`, e.message);
    }
    console.log('-------------------------------------------');
  }
}

run();

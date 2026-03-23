const fs = require('fs');
const path = require('path');
const { getAllPosts } = require('./posts');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

function generateSitemap() {
  const posts = getAllPosts();

  const staticPages = ['', '/blog'];

  const staticUrls = staticPages
    .map(
      (page) => `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('');

  const postUrls = posts
    .map(
      (post) => `
  <url>
    <loc>${BASE_URL}/posts/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`;

  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap.trim());
  console.log(`✅ sitemap.xml generated with ${posts.length + staticPages.length} URLs`);
}

generateSitemap();

const fs = require('fs');
const path = require('path');
const { getAllPosts } = require('./posts');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'My Next.js Blog';
const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  'A high-performance blog built with Next.js and MDX';

function generateRSS() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/posts/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/posts/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${post.author}</author>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE_NAME}]]></title>
    <link>${BASE_URL}</link>
    <description><![CDATA[${SITE_DESCRIPTION}]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  const outputPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(outputPath, rss.trim());
  console.log(`✅ rss.xml generated with ${posts.length} items`);
}

generateRSS();

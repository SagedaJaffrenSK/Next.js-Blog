const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const readingTime = require('reading-time');

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Get all post slugs (filenames without extension)
 */
function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

/**
 * Get metadata for all posts, sorted by date (newest first)
 */
function getAllPosts() {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Get a single post's frontmatter + content by slug
 */
function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    content,
    title: data.title || '',
    date: data.date || '',
    author: data.author || '',
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    image: data.image || `https://picsum.photos/seed/${slug}/800/400`,
    readingTime: stats.text,
  };
}

module.exports = { getAllPostSlugs, getAllPosts, getPostBySlug };

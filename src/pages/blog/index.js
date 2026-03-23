import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import Pagination from '../../components/Pagination';
import { getAllPosts } from '../../lib/posts';

const POSTS_PER_PAGE = 10;

export default function BlogPage({ posts, currentPage, totalPages, toggleTheme, theme }) {
  return (
    <>
      <NextSeo
        title="Blog"
        description="Browse all articles about Next.js, React, CSS, SEO, Docker, and modern web development."
        openGraph={{
          title: 'Blog | Next.js Blog',
          description: 'Browse all articles about Next.js, React, CSS, SEO, Docker, and modern web development.',
        }}
      />

      <Layout toggleTheme={toggleTheme} theme={theme}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <header className="mb-12">
            <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              All Posts
            </h1>
            <p className="text-stone-500 dark:text-stone-400">
              Page {currentPage} of {totalPages}
            </p>
          </header>

          <div data-testid="post-list" className="grid gap-5 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const posts = allPosts.slice(0, POSTS_PER_PAGE);

  return {
    props: {
      posts,
      currentPage: 1,
      totalPages,
    },
  };
}

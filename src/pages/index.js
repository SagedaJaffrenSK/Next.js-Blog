import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getAllPosts } from '../lib/posts';

const FEATURED_COUNT = 6;

export default function Home({ posts, toggleTheme, theme }) {
  return (
    <>
      <NextSeo
        title="Home"
        description="A high-performance, SEO-optimized blog built with Next.js, MDX, and Tailwind CSS."
        openGraph={{
          title: 'Next.js Blog',
          description: 'A high-performance, SEO-optimized blog built with Next.js, MDX, and Tailwind CSS.',
          url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        }}
      />

      <Layout toggleTheme={toggleTheme} theme={theme}>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-amber-600 dark:text-amber-500 uppercase mb-4">
            A Modern Blogging Platform
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-100 leading-tight mb-6">
            Ideas worth<br />
            <span className="text-amber-700 dark:text-amber-400 italic">reading.</span>
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
            Deep dives into Next.js, React, performance, and the modern web — written for developers who care about craft.
          </p>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="border-t border-stone-200 dark:border-stone-800" />
        </div>

        {/* Featured Posts */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Recent Posts
            </h2>
            <a
              href="/blog"
              className="text-sm text-amber-700 dark:text-amber-400 hover:underline underline-offset-2"
            >
              View all →
            </a>
          </div>

          <div data-testid="post-list" className="grid gap-5 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, FEATURED_COUNT);
  return {
    props: { posts },
  };
}

import { NextSeo, ArticleJsonLd } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

import Layout from '../../components/Layout';
import MDXComponents from '../../components/MDXComponents';
import { getAllPostSlugs, getPostBySlug } from '../../lib/posts';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default function PostPage({ post, mdxSource, toggleTheme, theme }) {
  return (
    <>
      <NextSeo
        title={post.title}
        description={post.excerpt}
        openGraph={{
          type: 'article',
          title: post.title,
          description: post.excerpt,
          url: `${BASE_URL}/posts/${post.slug}`,
          images: [
            {
              url: post.image,
              width: 800,
              height: 400,
              alt: post.title,
            },
          ],
          article: {
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
          },
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          { name: 'author', content: post.author },
        ]}
      />

      <ArticleJsonLd
        url={`${BASE_URL}/posts/${post.slug}`}
        title={post.title}
        images={[post.image]}
        datePublished={post.date}
        authorName={post.author}
        description={post.excerpt}
      />

      <Layout toggleTheme={toggleTheme} theme={theme}>
        <article data-testid="blog-post" className="max-w-3xl mx-auto px-6 py-16">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-10 transition-colors"
          >
            ← All posts
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            data-testid="post-title"
            className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 leading-tight mb-6"
          >
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500 dark:text-stone-400 mb-8 pb-8 border-b border-stone-200 dark:border-stone-800">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span data-testid="reading-time">{post.readingTime}</span>
          </div>

          {/* Hero Image */}
          <div className="mb-10 rounded-2xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto"
              data-testid="optimized-image"
              priority
            />
          </div>

          {/* MDX Content */}
          <div data-testid="post-content" className="prose dark:prose-invert">
            <MDXRemote {...mdxSource} components={MDXComponents} />
          </div>

          {/* Bottom nav */}
          <div className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-800">
            <Link
              href="/blog"
              className="text-sm text-amber-700 dark:text-amber-400 hover:underline underline-offset-2"
            >
              ← Back to all posts
            </Link>
          </div>
        </article>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
  });

  return {
    props: {
      post: {
        slug: post.slug,
        title: post.title,
        date: post.date,
        author: post.author,
        tags: post.tags,
        excerpt: post.excerpt,
        image: post.image,
        readingTime: post.readingTime,
      },
      mdxSource,
    },
  };
}

import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

export default function Custom404({ toggleTheme, theme }) {
  return (
    <>
      <NextSeo title="404 – Page Not Found" noindex />
      <Layout toggleTheme={toggleTheme} theme={theme}>
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <p className="font-serif text-8xl font-bold text-stone-200 dark:text-stone-800 mb-4">
            404
          </p>
          <div data-testid="not-found-message">
            <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Page Not Found
            </h1>
            <p className="text-stone-500 dark:text-stone-400 mb-8 text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium text-sm transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-medium text-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Browse Posts
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}

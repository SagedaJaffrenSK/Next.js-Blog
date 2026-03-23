import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 mt-20 py-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500 dark:text-stone-500">
        <p>© {new Date().getFullYear()} Next.js Blog. Built with Next.js & MDX.</p>
        <div className="flex gap-6">
          <Link href="/sitemap.xml" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            Sitemap
          </Link>
          <Link href="/rss.xml" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            RSS Feed
          </Link>
          <Link href="/blog" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            All Posts
          </Link>
        </div>
      </div>
    </footer>
  );
}

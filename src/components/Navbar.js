import Link from 'next/link';

export default function Navbar({ toggleTheme, theme }) {
  return (
    <nav className="sticky top-0 z-50 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
        >
          ✦ Next.js Blog
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            Blog
          </Link>

          <button
            data-testid="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

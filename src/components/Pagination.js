import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, basePath = '/blog' }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav data-testid="pagination" aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 ? (
        <Link
          data-testid="pagination-prev"
          href={currentPage - 1 === 1 ? basePath : `${basePath}/${currentPage - 1}`}
          className="px-4 py-2 text-sm border border-stone-300 dark:border-stone-700 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          ← Previous
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm border border-stone-200 dark:border-stone-800 rounded-lg text-stone-300 dark:text-stone-600 cursor-not-allowed">
          ← Previous
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          data-testid={`pagination-page-${page}`}
          href={page === 1 ? basePath : `${basePath}/${page}`}
          className={`w-10 h-10 flex items-center justify-center text-sm rounded-lg border transition-colors ${
            page === currentPage
              ? 'bg-amber-600 border-amber-600 text-white font-bold'
              : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          data-testid="pagination-next"
          href={`${basePath}/${currentPage + 1}`}
          className="px-4 py-2 text-sm border border-stone-300 dark:border-stone-700 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          Next →
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm border border-stone-200 dark:border-stone-800 rounded-lg text-stone-300 dark:text-stone-600 cursor-not-allowed">
          Next →
        </span>
      )}
    </nav>
  );
}

import Link from 'next/link';

export default function PostCard({ post }) {
  const { slug, title, date, author, tags, excerpt, readingTime } = post;

  return (
    <article
      data-testid={`post-card-${slug}`}
      className="group border border-stone-200 dark:border-stone-800 rounded-2xl p-6 bg-white dark:bg-stone-900 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
        {title}
      </h2>

      <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 leading-relaxed line-clamp-2">
        {excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="text-xs text-stone-400 dark:text-stone-500">
          <span>{author}</span>
          <span className="mx-2">·</span>
          <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          <span className="mx-2">·</span>
          <span>{readingTime}</span>
        </div>

        <Link
          href={`/posts/${slug}`}
          data-testid={`read-more-${slug}`}
          className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline underline-offset-2"
          aria-label={`Read more about ${title}`}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}

import NextImage from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * CodeBlock: wraps <pre> and applies highlight.js after mount.
 */
function CodeBlock({ children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.hljs && ref.current) {
      ref.current.querySelectorAll('code').forEach((block) => {
        window.hljs.highlightElement(block);
      });
    }
  }, []);

  return (
    <pre data-testid="code-block" ref={ref} {...rest}>
      {children}
    </pre>
  );
}

/**
 * Custom MDX components — passed into MDXRemote so our MDX can use
 * Next.js Image optimization and styled code blocks automatically.
 */
const MDXComponents = {
  // Override <img> with next/image
  img: ({ src, alt, width, height, ...rest }) => (
    <span className="block my-6">
      <NextImage
        src={src}
        alt={alt || ''}
        width={width ? Number(width) : 800}
        height={height ? Number(height) : 450}
        className="rounded-xl w-full h-auto"
        data-testid="optimized-image"
        {...rest}
      />
    </span>
  ),

  // Override <pre> to add data-testid + highlight.js
  pre: CodeBlock,
};

export default MDXComponents;

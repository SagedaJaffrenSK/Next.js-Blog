import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { DefaultSeo } from 'next-seo';

const SEO_CONFIG = {
  titleTemplate: '%s | Next.js Blog',
  defaultTitle: 'Next.js Blog',
  description: 'A high-performance, SEO-optimized blog built with Next.js and MDX',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    siteName: 'Next.js Blog',
    images: [
      {
        url: 'https://picsum.photos/seed/blog-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'Next.js Blog',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'light';
    setTheme(stored);
    document.documentElement.classList.toggle('dark', stored === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <>
      <DefaultSeo {...SEO_CONFIG} />
      <Component {...pageProps} toggleTheme={toggleTheme} theme={theme} />
    </>
  );
}

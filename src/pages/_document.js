import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Source+Code+Pro:wght@400;500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* highlight.js for code block syntax highlighting */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
          defer
        />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

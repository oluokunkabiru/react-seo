# @koadit/react-seo

> A powerful React SEO package for managing dynamic meta tags, Open Graph, Twitter Cards, JSON-LD structured data, and canonical URLs — enabling Google to detect and index every individual page in your React application.

---

## Features

- ✅ **Per-page SEO** — set different title/description per route
- ✅ **Google-friendly** — canonical URLs, robots meta, JSON-LD structured data for rich results
- ✅ **Open Graph** — Facebook, LinkedIn, WhatsApp link previews
- ✅ **Twitter Cards** — Twitter/X link previews
- ✅ **SSR-safe** — built on `react-helmet-async`, compatible with Next.js and Vite SSR
- ✅ **TypeScript** — full type definitions included
- ✅ **Tree-shakeable** — ESM + CJS dual output

---

## Installation

```bash
npm install @koadit/react-seo react-helmet-async
# or
yarn add @koadit/react-seo react-helmet-async
```

---

## Quick Start

### 1. Wrap your app root with `<SEOProvider />`

```tsx
// main.tsx or App.tsx (root entry point)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SEOProvider } from '@koadit/react-seo';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SEOProvider>
      <App />
    </SEOProvider>
  </React.StrictMode>
);
```

### 2. Add `<SEO />` to each page component

```tsx
// pages/HomePage.tsx
import { SEO } from '@koadit/react-seo';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        titleTemplate="%s | My Awesome App"
        description="Welcome to My Awesome App — the best place to get things done."
        canonical="https://myapp.com/"
        openGraph={{
          type: 'website',
          url: 'https://myapp.com/',
          siteName: 'My Awesome App',
          images: [
            {
              url: 'https://myapp.com/og-home.png',
              width: 1200,
              height: 630,
              alt: 'My Awesome App home page',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@myawesomeapp',
          handle: '@myawesomeapp',
        }}
      />
      <main>
        <h1>Welcome!</h1>
      </main>
    </>
  );
}
```

```tsx
// pages/AboutPage.tsx
import { SEO } from '@koadit/react-seo';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        titleTemplate="%s | My Awesome App"
        description="Learn about the team behind My Awesome App."
        canonical="https://myapp.com/about"
        robots="index, follow"
      />
      <main>
        <h1>About Us</h1>
      </main>
    </>
  );
}
```

---

## API Reference

### `<SEOProvider />`

Wrap your entire application once at the root. Required for `<SEO />` to work.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Your app |
| `helmetContext` | `object` | *(SSR only)* Empty object to collect rendered helmet state |

---

### `<SEO />`

Place inside any page/route component to set SEO metadata for that page.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Page title |
| `titleTemplate` | `string` | `'%s'` | Template wrapping the title. Use `%s` as placeholder |
| `defaultTitle` | `string` | — | Fallback title when no `title` is set |
| `description` | `string` | — | Meta description (150–160 chars recommended) |
| `canonical` | `string` | — | Canonical URL of the page |
| `robots` | `string` | `'index, follow'` | Robots meta directive |
| `language` | `string` | — | Content language, e.g. `'en'` |
| `openGraph` | `OpenGraphProps` | — | Open Graph social preview data |
| `twitter` | `TwitterProps` | — | Twitter Card data |
| `jsonLd` | `JsonLd \| JsonLd[]` | — | JSON-LD structured data for Google rich results |
| `additionalMetaTags` | `MetaTag[]` | `[]` | Extra `<meta>` tags |
| `additionalLinkTags` | `LinkTag[]` | `[]` | Extra `<link>` tags |

---

### `OpenGraphProps`

| Prop | Type | Description |
|------|------|-------------|
| `type` | `string` | OG type, e.g. `'website'`, `'article'` |
| `url` | `string` | Canonical URL of the content |
| `title` | `string` | OG title (falls back to page `title`) |
| `description` | `string` | OG description (falls back to page `description`) |
| `siteName` | `string` | Name of the overall site |
| `locale` | `string` | Content locale, e.g. `'en_US'` |
| `images` | `OGImage[]` | Array of images for the preview |
| `alternateLocale` | `string[]` | Alternate locales for the page |

### `OGImage`

| Prop | Type | Description |
|------|------|-------------|
| `url` | `string` | Image URL |
| `width` | `number` | Image width in pixels |
| `height` | `number` | Image height in pixels |
| `alt` | `string` | Alt text for the image |
| `type` | `string` | MIME type, e.g. `'image/png'` |

---

### `TwitterProps`

| Prop | Type | Description |
|------|------|-------------|
| `cardType` | `'summary' \| 'summary_large_image' \| 'app' \| 'player'` | Card format |
| `site` | `string` | Twitter @username of the website |
| `handle` | `string` | Twitter @username of the author |
| `title` | `string` | Card title (falls back to page `title`) |
| `description` | `string` | Card description (falls back to page `description`) |
| `image` | `string` | Card image URL |
| `imageAlt` | `string` | Alt text for the card image |

---

## Advanced Usage

### JSON-LD Structured Data (Google Rich Results)

```tsx
<SEO
  title="Chocolate Chip Cookies"
  description="The best chocolate chip cookie recipe."
  jsonLd={{
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Chocolate Chip Cookies',
    author: { '@type': 'Person', name: 'Jane Doe' },
    datePublished: '2024-01-15',
    description: 'The best chocolate chip cookie recipe.',
    prepTime: 'PT20M',
    cookTime: 'PT12M',
  }}
/>
```

### Article with multiple JSON-LD schemas

```tsx
<SEO
  title="My Blog Post"
  jsonLd={[
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'My Blog Post',
      author: { '@type': 'Person', name: 'John' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://myapp.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://myapp.com/blog' },
      ],
    },
  ]}
/>
```

### Additional Meta Tags

```tsx
<SEO
  title="Product Page"
  additionalMetaTags={[
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#6c63ff' },
    { property: 'article:published_time', content: '2024-01-15T09:00:00Z' },
  ]}
  additionalLinkTags={[
    { rel: 'alternate', href: 'https://myapp.com/fr/product', hrefLang: 'fr' },
    { rel: 'alternate', href: 'https://myapp.com/es/product', hrefLang: 'es' },
  ]}
/>
```

### Noindex a Page (e.g. admin or thank-you pages)

```tsx
<SEO title="Thank You" robots="noindex, nofollow" />
```

---

## SSR Usage (e.g. Vite SSR / Express)

```tsx
// server.tsx
import { renderToString } from 'react-dom/server';
import { SEOProvider } from '@koadit/react-seo';
import type { HelmetServerState } from 'react-helmet-async';

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <SEOProvider helmetContext={helmetContext}>
      <App url={url} />
    </SEOProvider>
  );

  const { helmet } = helmetContext;

  return {
    html,
    head: `
      ${helmet?.title.toString()}
      ${helmet?.meta.toString()}
      ${helmet?.link.toString()}
      ${helmet?.script.toString()}
    `,
  };
}
```

---

## License

MIT © Koadit

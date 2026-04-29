# react-seo-kit

> A powerful React SEO component library for managing dynamic meta tags, Open Graph, Twitter Cards, JSON-LD structured data, and canonical URLs — enabling Google to detect and index every individual page in your React application.

[![npm version](https://img.shields.io/npm/v/react-seo-kit.svg)](https://www.npmjs.com/package/react-seo-kit)
[![npm downloads](https://img.shields.io/npm/dm/react-seo-kit.svg)](https://www.npmjs.com/package/react-seo-kit)
[![license](https://img.shields.io/npm/l/react-seo-kit.svg)](https://github.com/oluokunkabiru/react-seo/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

---

## Features

- ✅ **Per-page SEO** — set different title, description, and meta per route
- ✅ **Google-friendly** — canonical URLs, robots meta, JSON-LD structured data for rich results
- ✅ **Open Graph** — Facebook, LinkedIn, WhatsApp link previews
- ✅ **Twitter Cards** — Twitter/X link previews
- ✅ **SSR-safe** — built on `react-helmet-async`, compatible with Next.js and Vite SSR
- ✅ **TypeScript** — full type definitions included
- ✅ **Tree-shakeable** — ESM + CJS dual output
- ✅ **Zero config** — drop in and go, sensible defaults out of the box

---

## Installation

```bash
npm install react-seo-kit
# or
yarn add react-seo-kit
# or
pnpm add react-seo-kit
```

> `react-helmet-async` is included as a dependency — no separate install needed.

---

## Quick Start

### 1. Wrap your app root with `<SEOProvider />`

```tsx
// main.tsx or App.tsx (root entry point)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SEOProvider } from 'react-seo-kit';
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
import { SEO } from 'react-seo-kit';

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
import { SEO } from 'react-seo-kit';

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

### Additional Meta Tags & Alternate Languages

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
import { SEOProvider } from 'react-seo-kit';
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

## 🏢 Need a Custom Package for Your Company?

> **KOADIT Digital Solutions** builds bespoke npm packages tailored to your organization's exact needs.

Every growing company has unique internal tools, design systems, and business logic that shouldn't be rewritten across every project. We turn your core modules into **professional, reusable npm packages** — whether public or private — so your teams can ship faster and stay consistent.

### What we can build for you:

| Package Type | Examples |
|---|---|
| **UI Component Libraries** | Your branded design system as an installable React package |
| **SEO & Meta Management** | Custom SEO rules baked into your own branded package |
| **Authentication SDKs** | Plug-and-play auth flows for your platform |
| **Payment & Fintech SDKs** | Unified SDK wrapping your payment providers |
| **Data & API Clients** | Auto-generated typed clients for your internal APIs |
| **Analytics & Tracking** | Custom event tracking wrapped in a simple package |
| **Utility Libraries** | Shared helpers, validators, formatters across your apps |

### Why choose us?

- 🔒 **Private or public** — we publish to npm, GitHub Packages, or your private registry
- 🧩 **Monorepo ready** — structured for use in Nx, Turborepo, or Lerna setups
- 📝 **Fully documented** — README, TypeDoc API docs, and usage examples included
- 🔄 **CI/CD pipelines** — automated versioning, changelog generation, and publishing
- ♻️ **Long-term maintenance** — we stay to support, update, and evolve your packages

---

## 📬 Contact Us

We'd love to hear about your project. Reach out to the KOADIT team:

| Channel | Details |
|---|---|
| 🌐 **Website** | [koadit.com](https://koadit.com) |
| 📧 **Email** | [hello@koadit.com](mailto:hello@koadit.com) |
| 💼 **LinkedIn** | [linkedin.com/company/koadit](https://linkedin.com/company/koadit) |
| 🐦 **Twitter / X** | [@koadit](https://twitter.com/koadit) |
| 💻 **GitHub** | [github.com/oluokunkabiru](https://github.com/oluokunkabiru) |
| 📦 **npm** | [npmjs.com/~koadit](https://www.npmjs.com/~koadit) |

> 💡 **Got a module in your codebase that your whole team copies between projects?** That's a package waiting to be born. [Let's talk →](mailto:hello@koadit.com)

---

## Contributing

Contributions, issues and feature requests are welcome!
Feel free to check the [issues page](https://github.com/oluokunkabiru/react-seo/issues).

1. Fork the repo
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

---

## License

MIT © [KOADIT Digital Solutions](https://koadit.com)

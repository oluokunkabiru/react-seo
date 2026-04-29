import React from 'react';
import { Helmet } from 'react-helmet-async';
import type {
  SEOProps,
  OGImage,
  MetaTag,
  LinkTag,
  JsonLd,
} from './types';

/**
 * Builds Open Graph meta tags from the openGraph prop.
 */
function buildOpenGraphTags(
  og: SEOProps['openGraph'],
  fallbackTitle?: string,
  fallbackDesc?: string,
): React.ReactElement[] {
  if (!og) return [];
  const tags: React.ReactElement[] = [];

  const title = og.title ?? fallbackTitle;
  const description = og.description ?? fallbackDesc;

  if (og.type) tags.push(<meta key="og:type" property="og:type" content={og.type} />);
  if (og.url) tags.push(<meta key="og:url" property="og:url" content={og.url} />);
  if (title) tags.push(<meta key="og:title" property="og:title" content={title} />);
  if (description) tags.push(<meta key="og:description" property="og:description" content={description} />);
  if (og.siteName) tags.push(<meta key="og:site_name" property="og:site_name" content={og.siteName} />);
  if (og.locale) tags.push(<meta key="og:locale" property="og:locale" content={og.locale} />);

  og.alternateLocale?.forEach((locale, i) => {
    tags.push(
      <meta key={`og:locale:alternate:${i}`} property="og:locale:alternate" content={locale} />,
    );
  });

  og.images?.forEach((img: OGImage, i: number) => {
    tags.push(<meta key={`og:image:${i}`} property="og:image" content={img.url} />);
    if (img.width) tags.push(<meta key={`og:image:width:${i}`} property="og:image:width" content={String(img.width)} />);
    if (img.height) tags.push(<meta key={`og:image:height:${i}`} property="og:image:height" content={String(img.height)} />);
    if (img.alt) tags.push(<meta key={`og:image:alt:${i}`} property="og:image:alt" content={img.alt} />);
    if (img.type) tags.push(<meta key={`og:image:type:${i}`} property="og:image:type" content={img.type} />);
  });

  return tags;
}

/**
 * Builds Twitter Card meta tags from the twitter prop.
 */
function buildTwitterTags(
  twitter: SEOProps['twitter'],
  fallbackTitle?: string,
  fallbackDesc?: string,
): React.ReactElement[] {
  if (!twitter) return [];
  const tags: React.ReactElement[] = [];

  const cardType = twitter.cardType ?? 'summary_large_image';
  const title = twitter.title ?? fallbackTitle;
  const description = twitter.description ?? fallbackDesc;

  tags.push(<meta key="twitter:card" name="twitter:card" content={cardType} />);
  if (twitter.site) tags.push(<meta key="twitter:site" name="twitter:site" content={twitter.site} />);
  if (twitter.handle) tags.push(<meta key="twitter:creator" name="twitter:creator" content={twitter.handle} />);
  if (title) tags.push(<meta key="twitter:title" name="twitter:title" content={title} />);
  if (description) tags.push(<meta key="twitter:description" name="twitter:description" content={description} />);
  if (twitter.image) tags.push(<meta key="twitter:image" name="twitter:image" content={twitter.image} />);
  if (twitter.imageAlt) tags.push(<meta key="twitter:image:alt" name="twitter:image:alt" content={twitter.imageAlt} />);

  return tags;
}

/**
 * Builds JSON-LD script tags from the jsonLd prop.
 */
function buildJsonLdScripts(jsonLd: JsonLd | JsonLd[]): React.ReactElement[] {
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return schemas.map((schema, i) => (
    <script
      key={`jsonld:${i}`}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ));
}

/**
 * `<SEO />` — Drop-in component for managing all SEO meta tags in a React application.
 *
 * Place this component inside any page component to set that page's SEO metadata.
 * The closest `<SEO />` to the root will take precedence for shared tags.
 *
 * @example
 * ```tsx
 * <SEO
 *   title="About Us"
 *   titleTemplate="%s | Koadit"
 *   description="Learn more about the Koadit team."
 *   canonical="https://koadit.com/about"
 *   openGraph={{
 *     type: 'website',
 *     url: 'https://koadit.com/about',
 *     images: [{ url: 'https://koadit.com/og-image.png', width: 1200, height: 630 }],
 *   }}
 *   twitter={{ cardType: 'summary_large_image', site: '@koadit' }}
 * />
 * ```
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  titleTemplate,
  defaultTitle,
  description,
  canonical,
  robots = 'index, follow',
  language,
  openGraph,
  twitter,
  jsonLd,
  additionalMetaTags = [],
  additionalLinkTags = [],
}) => {
  const resolvedTitleTemplate = titleTemplate ?? '%s';

  return (
    <Helmet
      defaultTitle={defaultTitle}
      titleTemplate={resolvedTitleTemplate}
    >
      {/* ── Core ───────────────────────────────────────────────────── */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {robots && <meta name="robots" content={robots} />}
      {language && <meta httpEquiv="content-language" content={language} />}

      {/* ── Canonical ───────────────────────────────────────────────── */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* ── Open Graph ──────────────────────────────────────────────── */}
      {buildOpenGraphTags(openGraph, title, description)}

      {/* ── Twitter Card ────────────────────────────────────────────── */}
      {buildTwitterTags(twitter, title, description)}

      {/* ── JSON-LD Structured Data ─────────────────────────────────── */}
      {jsonLd && buildJsonLdScripts(jsonLd)}

      {/* ── Additional Meta Tags ────────────────────────────────────── */}
      {additionalMetaTags.map((tag: MetaTag, i: number) => (
        <meta key={`meta:${i}`} {...tag} />
      ))}

      {/* ── Additional Link Tags ────────────────────────────────────── */}
      {additionalLinkTags.map((tag: LinkTag, i: number) => (
        <link key={`link:${i}`} {...tag} />
      ))}
    </Helmet>
  );
};

export default SEO;

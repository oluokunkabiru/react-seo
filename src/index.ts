/**
 * @koadit/react-seo
 *
 * A React SEO package for managing meta tags, Open Graph, Twitter Cards,
 * JSON-LD structured data, and canonical URLs per page.
 *
 * @see https://github.com/koadit/koadit-spark/tree/main/packages/react-seo
 */

export { SEO } from './SEO';
export { SEOProvider } from './SEOProvider';

// Re-export types for consumers
export type {
  SEOProps,
  OpenGraphProps,
  OGImage,
  TwitterProps,
  JsonLd,
  MetaTag,
  LinkTag,
} from './types';

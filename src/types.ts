/**
 * SEO Type Definitions for @koadit/react-seo
 */

/** Open Graph image object */
export interface OGImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

/** Open Graph metadata */
export interface OpenGraphProps {
  /** The type of your object, e.g. 'website', 'article', 'profile' */
  type?: string;
  /** The canonical URL of your object */
  url?: string;
  /** The title of your object as it should appear within the graph */
  title?: string;
  /** A one to two sentence description of your object */
  description?: string;
  /** The name of your site. e.g. "IMDb" */
  siteName?: string;
  /** The locale of the content, e.g. 'en_US' */
  locale?: string;
  /** An image (or array of images) which should represent your object within the graph */
  images?: OGImage[];
  /** An array of other locales this page is available in */
  alternateLocale?: string[];
}

/** Twitter card metadata */
export interface TwitterProps {
  /** The card type. 'summary' | 'summary_large_image' | 'app' | 'player' */
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** @username for the website used in the card footer */
  site?: string;
  /** @username for the content creator / author */
  handle?: string;
  /** Title of content (max 70 chars) */
  title?: string;
  /** Description of content (max 200 chars) */
  description?: string;
  /** URL of image to use in the card */
  image?: string;
  /** A text description of the image (alt text for accessibility) */
  imageAlt?: string;
}

/** JSON-LD Structured data for Google rich results */
export type JsonLd = Record<string, unknown>;

/** Custom meta tag definition */
export interface MetaTag {
  name?: string;
  property?: string;
  httpEquiv?: string;
  content: string;
  charset?: string;
}

/** Link tag definition */
export interface LinkTag {
  rel: string;
  href: string;
  hrefLang?: string;
  media?: string;
  type?: string;
  sizes?: string;
}

/** Main props for the SEO component */
export interface SEOProps {
  /**
   * The title of the page. Will be appended to `titleTemplate` if provided.
   * @example "Home"
   */
  title?: string;

  /**
   * Template for the title. Use `%s` as a placeholder for the page title.
   * @example "%s | My Awesome App"
   * @default "%s"
   */
  titleTemplate?: string;

  /**
   * Default title to use when `title` prop is not provided.
   */
  defaultTitle?: string;

  /**
   * The meta description of the page. Crucial for Google search snippet.
   * Recommended: 150–160 characters.
   */
  description?: string;

  /**
   * The canonical URL of the page. Helps prevent duplicate content issues.
   * @example "https://myapp.com/about"
   */
  canonical?: string;

  /**
   * Robots meta tag instructions.
   * @example "index, follow" (default) | "noindex, nofollow"
   */
  robots?: string;

  /**
   * The content language of the page.
   * @example "en"
   */
  language?: string;

  /**
   * Open Graph data for social media link previews (Facebook, LinkedIn, etc.)
   */
  openGraph?: OpenGraphProps;

  /**
   * Twitter Card data for Twitter link previews.
   */
  twitter?: TwitterProps;

  /**
   * JSON-LD structured data for Google rich results.
   * Pass an array for multiple schemas.
   * @see https://developers.google.com/search/docs/appearance/structured-data
   */
  jsonLd?: JsonLd | JsonLd[];

  /**
   * Additional meta tags to inject.
   */
  additionalMetaTags?: MetaTag[];

  /**
   * Additional link tags to inject (e.g. alternate languages, favicon).
   */
  additionalLinkTags?: LinkTag[];
}

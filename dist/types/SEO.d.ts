import React from 'react';
import type { SEOProps } from './types';
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
export declare const SEO: React.FC<SEOProps>;
export default SEO;
//# sourceMappingURL=SEO.d.ts.map
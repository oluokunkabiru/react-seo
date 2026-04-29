import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
/**
 * Builds Open Graph meta tags from the openGraph prop.
 */
function buildOpenGraphTags(og, fallbackTitle, fallbackDesc) {
    var _a, _b, _c, _d;
    if (!og)
        return [];
    const tags = [];
    const title = (_a = og.title) !== null && _a !== void 0 ? _a : fallbackTitle;
    const description = (_b = og.description) !== null && _b !== void 0 ? _b : fallbackDesc;
    if (og.type)
        tags.push(_jsx("meta", { property: "og:type", content: og.type }, "og:type"));
    if (og.url)
        tags.push(_jsx("meta", { property: "og:url", content: og.url }, "og:url"));
    if (title)
        tags.push(_jsx("meta", { property: "og:title", content: title }, "og:title"));
    if (description)
        tags.push(_jsx("meta", { property: "og:description", content: description }, "og:description"));
    if (og.siteName)
        tags.push(_jsx("meta", { property: "og:site_name", content: og.siteName }, "og:site_name"));
    if (og.locale)
        tags.push(_jsx("meta", { property: "og:locale", content: og.locale }, "og:locale"));
    (_c = og.alternateLocale) === null || _c === void 0 ? void 0 : _c.forEach((locale, i) => {
        tags.push(_jsx("meta", { property: "og:locale:alternate", content: locale }, `og:locale:alternate:${i}`));
    });
    (_d = og.images) === null || _d === void 0 ? void 0 : _d.forEach((img, i) => {
        tags.push(_jsx("meta", { property: "og:image", content: img.url }, `og:image:${i}`));
        if (img.width)
            tags.push(_jsx("meta", { property: "og:image:width", content: String(img.width) }, `og:image:width:${i}`));
        if (img.height)
            tags.push(_jsx("meta", { property: "og:image:height", content: String(img.height) }, `og:image:height:${i}`));
        if (img.alt)
            tags.push(_jsx("meta", { property: "og:image:alt", content: img.alt }, `og:image:alt:${i}`));
        if (img.type)
            tags.push(_jsx("meta", { property: "og:image:type", content: img.type }, `og:image:type:${i}`));
    });
    return tags;
}
/**
 * Builds Twitter Card meta tags from the twitter prop.
 */
function buildTwitterTags(twitter, fallbackTitle, fallbackDesc) {
    var _a, _b, _c;
    if (!twitter)
        return [];
    const tags = [];
    const cardType = (_a = twitter.cardType) !== null && _a !== void 0 ? _a : 'summary_large_image';
    const title = (_b = twitter.title) !== null && _b !== void 0 ? _b : fallbackTitle;
    const description = (_c = twitter.description) !== null && _c !== void 0 ? _c : fallbackDesc;
    tags.push(_jsx("meta", { name: "twitter:card", content: cardType }, "twitter:card"));
    if (twitter.site)
        tags.push(_jsx("meta", { name: "twitter:site", content: twitter.site }, "twitter:site"));
    if (twitter.handle)
        tags.push(_jsx("meta", { name: "twitter:creator", content: twitter.handle }, "twitter:creator"));
    if (title)
        tags.push(_jsx("meta", { name: "twitter:title", content: title }, "twitter:title"));
    if (description)
        tags.push(_jsx("meta", { name: "twitter:description", content: description }, "twitter:description"));
    if (twitter.image)
        tags.push(_jsx("meta", { name: "twitter:image", content: twitter.image }, "twitter:image"));
    if (twitter.imageAlt)
        tags.push(_jsx("meta", { name: "twitter:image:alt", content: twitter.imageAlt }, "twitter:image:alt"));
    return tags;
}
/**
 * Builds JSON-LD script tags from the jsonLd prop.
 */
function buildJsonLdScripts(jsonLd) {
    const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    return schemas.map((schema, i) => (_jsx("script", { type: "application/ld+json", 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML: { __html: JSON.stringify(schema) } }, `jsonld:${i}`)));
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
export const SEO = ({ title, titleTemplate, defaultTitle, description, canonical, robots = 'index, follow', language, openGraph, twitter, jsonLd, additionalMetaTags = [], additionalLinkTags = [], }) => {
    const resolvedTitleTemplate = titleTemplate !== null && titleTemplate !== void 0 ? titleTemplate : '%s';
    return (_jsxs(Helmet, { defaultTitle: defaultTitle, titleTemplate: resolvedTitleTemplate, children: [title && _jsx("title", { children: title }), description && _jsx("meta", { name: "description", content: description }), robots && _jsx("meta", { name: "robots", content: robots }), language && _jsx("meta", { httpEquiv: "content-language", content: language }), canonical && _jsx("link", { rel: "canonical", href: canonical }), buildOpenGraphTags(openGraph, title, description), buildTwitterTags(twitter, title, description), jsonLd && buildJsonLdScripts(jsonLd), additionalMetaTags.map((tag, i) => (_jsx("meta", Object.assign({}, tag), `meta:${i}`))), additionalLinkTags.map((tag, i) => (_jsx("link", Object.assign({}, tag), `link:${i}`)))] }));
};
export default SEO;

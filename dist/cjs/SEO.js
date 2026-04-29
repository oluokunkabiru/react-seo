"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEO = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_helmet_async_1 = require("react-helmet-async");
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
        tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:type", content: og.type }, "og:type"));
    if (og.url)
        tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:url", content: og.url }, "og:url"));
    if (title)
        tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:title", content: title }, "og:title"));
    if (description)
        tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:description", content: description }, "og:description"));
    if (og.siteName)
        tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:site_name", content: og.siteName }, "og:site_name"));
    if (og.locale)
        tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:locale", content: og.locale }, "og:locale"));
    (_c = og.alternateLocale) === null || _c === void 0 ? void 0 : _c.forEach((locale, i) => {
        tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:locale:alternate", content: locale }, `og:locale:alternate:${i}`));
    });
    (_d = og.images) === null || _d === void 0 ? void 0 : _d.forEach((img, i) => {
        tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:image", content: img.url }, `og:image:${i}`));
        if (img.width)
            tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:image:width", content: String(img.width) }, `og:image:width:${i}`));
        if (img.height)
            tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:image:height", content: String(img.height) }, `og:image:height:${i}`));
        if (img.alt)
            tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:image:alt", content: img.alt }, `og:image:alt:${i}`));
        if (img.type)
            tags.push((0, jsx_runtime_1.jsx)("meta", { property: "og:image:type", content: img.type }, `og:image:type:${i}`));
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
    tags.push((0, jsx_runtime_1.jsx)("meta", { name: "twitter:card", content: cardType }, "twitter:card"));
    if (twitter.site)
        tags.push((0, jsx_runtime_1.jsx)("meta", { name: "twitter:site", content: twitter.site }, "twitter:site"));
    if (twitter.handle)
        tags.push((0, jsx_runtime_1.jsx)("meta", { name: "twitter:creator", content: twitter.handle }, "twitter:creator"));
    if (title)
        tags.push((0, jsx_runtime_1.jsx)("meta", { name: "twitter:title", content: title }, "twitter:title"));
    if (description)
        tags.push((0, jsx_runtime_1.jsx)("meta", { name: "twitter:description", content: description }, "twitter:description"));
    if (twitter.image)
        tags.push((0, jsx_runtime_1.jsx)("meta", { name: "twitter:image", content: twitter.image }, "twitter:image"));
    if (twitter.imageAlt)
        tags.push((0, jsx_runtime_1.jsx)("meta", { name: "twitter:image:alt", content: twitter.imageAlt }, "twitter:image:alt"));
    return tags;
}
/**
 * Builds JSON-LD script tags from the jsonLd prop.
 */
function buildJsonLdScripts(jsonLd) {
    const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    return schemas.map((schema, i) => ((0, jsx_runtime_1.jsx)("script", { type: "application/ld+json", 
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
const SEO = ({ title, titleTemplate, defaultTitle, description, canonical, robots = 'index, follow', language, openGraph, twitter, jsonLd, additionalMetaTags = [], additionalLinkTags = [], }) => {
    const resolvedTitleTemplate = titleTemplate !== null && titleTemplate !== void 0 ? titleTemplate : '%s';
    return ((0, jsx_runtime_1.jsxs)(react_helmet_async_1.Helmet, { defaultTitle: defaultTitle, titleTemplate: resolvedTitleTemplate, children: [title && (0, jsx_runtime_1.jsx)("title", { children: title }), description && (0, jsx_runtime_1.jsx)("meta", { name: "description", content: description }), robots && (0, jsx_runtime_1.jsx)("meta", { name: "robots", content: robots }), language && (0, jsx_runtime_1.jsx)("meta", { httpEquiv: "content-language", content: language }), canonical && (0, jsx_runtime_1.jsx)("link", { rel: "canonical", href: canonical }), buildOpenGraphTags(openGraph, title, description), buildTwitterTags(twitter, title, description), jsonLd && buildJsonLdScripts(jsonLd), additionalMetaTags.map((tag, i) => ((0, jsx_runtime_1.jsx)("meta", Object.assign({}, tag), `meta:${i}`))), additionalLinkTags.map((tag, i) => ((0, jsx_runtime_1.jsx)("link", Object.assign({}, tag), `link:${i}`)))] }));
};
exports.SEO = SEO;
exports.default = exports.SEO;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEOProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_helmet_async_1 = require("react-helmet-async");
/**
 * `<SEOProvider />` — Wrap your React application root with this component
 * to enable SEO meta tag management across all pages.
 *
 * This is a thin wrapper around `HelmetProvider` from `react-helmet-async`.
 * It must be placed at the very top of your component tree, typically in your
 * `main.tsx` or `App.tsx`.
 *
 * @example
 * ```tsx
 * // main.tsx
 * import { SEOProvider } from '@koadit/react-seo';
 *
 * ReactDOM.createRoot(document.getElementById('root')!).render(
 *   <React.StrictMode>
 *     <SEOProvider>
 *       <App />
 *     </SEOProvider>
 *   </React.StrictMode>
 * );
 * ```
 */
const SEOProvider = ({ children, helmetContext, }) => {
    return ((0, jsx_runtime_1.jsx)(react_helmet_async_1.HelmetProvider, { context: helmetContext, children: children }));
};
exports.SEOProvider = SEOProvider;
exports.default = exports.SEOProvider;

import { jsx as _jsx } from "react/jsx-runtime";
import { HelmetProvider } from 'react-helmet-async';
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
export const SEOProvider = ({ children, helmetContext, }) => {
    return (_jsx(HelmetProvider, { context: helmetContext, children: children }));
};
export default SEOProvider;

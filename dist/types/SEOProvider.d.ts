import React from 'react';
import { HelmetServerState } from 'react-helmet-async';
export interface SEOProviderProps {
    /** Your application children */
    children: React.ReactNode;
    /**
     * For Server-Side Rendering (SSR): pass an empty object `{}` here and the
     * HelmetProvider will fill it with the helmet state after rendering, which
     * you can then inject into your HTML string.
     *
     * @example
     * ```tsx
     * // server.tsx
     * const helmetContext = {};
     * const html = renderToString(
     *   <SEOProvider helmetContext={helmetContext}>
     *     <App />
     *   </SEOProvider>
     * );
     * const { helmet } = helmetContext as { helmet: HelmetServerState };
     * // use helmet.title.toString(), helmet.meta.toString() etc. in your HTML template
     * ```
     */
    helmetContext?: {
        helmet?: HelmetServerState;
    };
}
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
export declare const SEOProvider: React.FC<SEOProviderProps>;
export default SEOProvider;
//# sourceMappingURL=SEOProvider.d.ts.map
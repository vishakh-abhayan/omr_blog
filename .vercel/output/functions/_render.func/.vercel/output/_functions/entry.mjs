import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Z-qQbi5N.mjs';
import { manifest } from './manifest_dviTOZlW.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/category/_category_/_page_.astro.mjs');
const _page2 = () => import('./pages/post/_---slug_.astro.mjs');
const _page3 = () => import('./pages/rss.xml.astro.mjs');
const _page4 = () => import('./pages/tags.astro.mjs');
const _page5 = () => import('./pages/tags/_---tag_.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.16.7_typescript@5.2.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/category/[category]/[page].astro", _page1],
    ["src/pages/post/[...slug].astro", _page2],
    ["src/pages/rss.xml.ts", _page3],
    ["src/pages/tags/index.astro", _page4],
    ["src/pages/tags/[...tag]/index.astro", _page5],
    ["src/pages/index.astro", _page6]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "74d59d5f-0318-4d46-8b34-2918e6fd5a6c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };

/* empty css                                  */
import { a as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_Bv_bxSDw.mjs';
import 'kleur/colors';
import { $ as $$ListCategories } from '../chunks/ListCategories_QRZpHGVL.mjs';
import { $ as $$ListPosts } from '../chunks/ListPosts_DLtnr6Q1.mjs';
import { $ as $$TitlePage } from '../chunks/TitlePage_9XxKOkwl.mjs';
import { b as getPosts, $ as $$BaseLayout } from '../chunks/BaseLayout_CLHx8crC.mjs';
import 'clsx';
import 'reading-time';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const MAX_POSTS = 5;
  const posts = await getPosts(MAX_POSTS);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TitlePage", $$TitlePage, { "title": "Oh My Resume" })} ${renderComponent($$result2, "ListCategories", $$ListCategories, {})} ${maybeRenderHead()}<div> <h2 class="text-lg font-medium tracking-wide text-end">Latest Posts</h2> ${renderComponent($$result2, "ListPosts", $$ListPosts, { "FirstBig": true, "posts": posts })} </div> ` })} `;
}, "/Users/vishakhabhayan/omr_blog/src/pages/index.astro", void 0);

const $$file = "/Users/vishakhabhayan/omr_blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

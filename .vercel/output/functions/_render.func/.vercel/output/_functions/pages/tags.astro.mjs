/* empty css                                  */
import { a as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_Bv_bxSDw.mjs';
import 'kleur/colors';
import { g as getTags, $ as $$BaseLayout } from '../chunks/BaseLayout_CLHx8crC.mjs';
import { $ as $$TitlePage } from '../chunks/TitlePage_9XxKOkwl.mjs';
import 'clsx';
import 'reading-time';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const tags = await getTags();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Tags" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TitlePage", $$TitlePage, { "title": "Tags" })} ${maybeRenderHead()}<div class="flex justify-center flex-wrap gap-4"> ${tags.map((tag) => renderTemplate`<a${addAttribute(`/tags/${tag}`, "href")} class="inline-block bg-gray-200  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
#${tag} </a>`)} </div> ` })}`;
}, "/Users/vishakhabhayan/omr_blog/src/pages/tags/index.astro", void 0);

const $$file = "/Users/vishakhabhayan/omr_blog/src/pages/tags/index.astro";
const $$url = "/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

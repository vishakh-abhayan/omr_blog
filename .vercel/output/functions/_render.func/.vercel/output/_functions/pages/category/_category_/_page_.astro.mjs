/* empty css                                        */
import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, e as renderComponent } from '../../../chunks/astro/server_Bv_bxSDw.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, d as getCategories, b as getPosts } from '../../../chunks/BaseLayout_CLHx8crC.mjs';
import { $ as $$ListPosts } from '../../../chunks/ListPosts_DLtnr6Q1.mjs';
import { u as unsluglify, s as sluglify, $ as $$ListCategories } from '../../../chunks/ListCategories_QRZpHGVL.mjs';
import { $ as $$TitlePage } from '../../../chunks/TitlePage_9XxKOkwl.mjs';
import 'clsx';
import 'reading-time';
import { s as siteConfig } from '../../../chunks/_astro_content_COsiKyC0.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$3 = createAstro("https://ohmyresume.com");
const $$ArrowLeft = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ArrowLeft;
  const { width = 24, height = 24 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-arrow-left-filled"${addAttribute(width, "width")}${addAttribute(height, "height")} viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 2a10 10 0 0 1 .324 19.995l-.324 .005l-.324 -.005a10 10 0 0 1 .324 -19.995zm.707 5.293a1 1 0 0 0 -1.414 0l-4 4a1.048 1.048 0 0 0 -.083 .094l-.064 .092l-.052 .098l-.044 .11l-.03 .112l-.017 .126l-.003 .075l.004 .09l.007 .058l.025 .118l.035 .105l.054 .113l.043 .07l.071 .095l.054 .058l4 4l.094 .083a1 1 0 0 0 1.32 -1.497l-2.292 -2.293h5.585l.117 -.007a1 1 0 0 0 -.117 -1.993h-5.586l2.293 -2.293l.083 -.094a1 1 0 0 0 -.083 -1.32z" stroke-width="0" fill="currentColor"></path> </svg>`;
}, "/Users/vishakhabhayan/omr_blog/src/components/icons/ArrowLeft.astro", void 0);

const $$Astro$2 = createAstro("https://ohmyresume.com");
const $$ArrowRight = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ArrowRight;
  const { width = 24, height = 24 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-arrow-right-filled"${addAttribute(width, "width")}${addAttribute(height, "height")} viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 2l.324 .005a10 10 0 1 1 -.648 0l.324 -.005zm.613 5.21a1 1 0 0 0 -1.32 1.497l2.291 2.293h-5.584l-.117 .007a1 1 0 0 0 .117 1.993h5.584l-2.291 2.293l-.083 .094a1 1 0 0 0 1.497 1.32l4 -4l.073 -.082l.064 -.089l.062 -.113l.044 -.11l.03 -.112l.017 -.126l.003 -.075l-.007 -.118l-.029 -.148l-.035 -.105l-.054 -.113l-.071 -.111a1.008 1.008 0 0 0 -.097 -.112l-4 -4z" stroke-width="0" fill="currentColor"></path> </svg>`;
}, "/Users/vishakhabhayan/omr_blog/src/components/icons/ArrowRight.astro", void 0);

const $$Astro$1 = createAstro("https://ohmyresume.com");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { page } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-5 md:gap-1 justify-around md:justify-end"> <!-- Previous Button --> ${page.start > 0 && renderTemplate`<a${addAttribute(page.url.prev, "href")} class="flex items-center justify-center px-8 md:px-4 h-10 text-base font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-transparent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> ${renderComponent($$result, "ArrowLeft", $$ArrowLeft, {})} </a>`} <!-- Next Button --> ${page.currentPage < page.lastPage && renderTemplate`<a${addAttribute(page.url.next, "href")} class="flex items-center justify-center px-8 md:px-4 h-10 ml-3 text-base font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-transparent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> ${renderComponent($$result, "ArrowRight", $$ArrowRight, {})} </a>`} </div>`;
}, "/Users/vishakhabhayan/omr_blog/src/components/Pagination.astro", void 0);

const $$Astro = createAstro("https://ohmyresume.com");
async function getStaticPaths({ paginate }) {
  const categories = await getCategories();
  const allPosts = await getPosts();
  return categories.flatMap((category) => {
    const unsluglifyNameCategory = unsluglify(category.toLowerCase());
    const filteredPosts = allPosts.filter(
      (post) => post.data.category.toLowerCase() === unsluglifyNameCategory
    );
    return paginate(filteredPosts, {
      params: {
        category: sluglify(category.toLowerCase())
      },
      pageSize: siteConfig.paginationSize
    });
  });
}
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const params = Astro2.params;
  const { page } = Astro2.props;
  const unsluglifyNameCategory = unsluglify(params.category.toLowerCase());
  const posts = page.data;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": params.category }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TitlePage", $$TitlePage, { "title": unsluglifyNameCategory })} ${renderComponent($$result2, "ListCategories", $$ListCategories, { "activeCategory": params.category })} ${renderComponent($$result2, "ListPosts", $$ListPosts, { "posts": posts })} ${renderComponent($$result2, "Pagination", $$Pagination, { "page": page })} ` })}`;
}, "/Users/vishakhabhayan/omr_blog/src/pages/category/[category]/[page].astro", void 0);

const $$file = "/Users/vishakhabhayan/omr_blog/src/pages/category/[category]/[page].astro";
const $$url = "/category/[category]/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$page,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

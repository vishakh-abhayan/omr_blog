import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, e as renderComponent } from './astro/server_Bv_bxSDw.mjs';
import 'kleur/colors';
import { $ as $$Image } from './_astro_assets_DJSYCx3R.mjs';
import { $ as $$FormattedDate } from './FormattedDate_feFNDRWj.mjs';
import 'clsx';
import { c as cn } from './BaseLayout_CLHx8crC.mjs';
import './_astro_content_COsiKyC0.mjs';
import 'reading-time';

const $$Astro$2 = createAstro("https://ohmyresume.com");
const $$ArrowUp = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ArrowUp;
  const { width = 24, height = 24 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg class="feather feather-arrow-up-right" fill="none"${addAttribute(height, "height")} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24"${addAttribute(width, "width")} xmlns="http://www.w3.org/2000/svg"><line x1="7" x2="17" y1="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;
}, "/Users/vishakhabhayan/omr_blog/src/components/icons/ArrowUp.astro", void 0);

const $$Astro$1 = createAstro("https://ohmyresume.com");
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostCard;
  const {
    id,
    data: { title, description, pubDate, heroImage, category },
    readTime,
    slug
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="grid grid-rows-[300px_auto] md:grid-rows-[300px_220px] min-h-full group"> <a class="relative overflow-hidden"${addAttribute(`/post/${slug}/`, "href")}> ${renderComponent($$result, "Image", $$Image, { "src": heroImage, "width": 600, "height": 200, "format": "webp", "class": "h-full min-w-full object-cover hover:scale-[101%] transition-all duration-200 rounded-[2px]", "alt": `img of ${title}` })} <div class="z-30 absolute bottom-0 w-full h-20"> <div class="-z-10 absolute bottom-0 glass w-full min-h-full"></div> <div class="flex items-center justify-between gap-x-1 text-white px-6 py-4"> <div class="flex flex-col gap-1 items-center justify-center"> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": pubDate })} <span class="text-sm"> ${readTime}</span> </div> <span class="pb-4">${category}</span> </div> </div> </a> <div class="flex justify-between flex-col gap-4 md:gap-0 py-6 pl-1"> <div class="flex flex-col gap-3"> <div class="flex flex-col gap-2"> <a class="text-2xl font-semibold -tracking-wider"${addAttribute(`/post/${slug}/`, "href")}> ${title} </a> </div> <p class="overflow-hidden line-clamp-3 text-gray-700 dark:text-white mb-5 font-[400] md:pr-[15%]"> ${description} </p> </div> <footer class="flex justify-between items-center"> <a${addAttribute(`/post/${slug}/`, "href")} class="flex justify-center items-center dark:text-white rounded-full hover:translate-x-1 transition-transform duration-150 ease-in-out font-semibold gap-1 group"${addAttribute(`go to ${title}`, "aria-label")}>
Read Post <span class="mt-[1px] group-hover:rotate-45 transition-transform duration-250 ease-in-out">${renderComponent($$result, "ArrowUp", $$ArrowUp, { "width": "18", "height": "18" })}</span> </a> </footer> </div> </article> `;
}, "/Users/vishakhabhayan/omr_blog/src/components/PostCard.astro", void 0);

const $$Astro = createAstro("https://ohmyresume.com");
const $$ListPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ListPosts;
  const { posts, FirstBig = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(cn(
    `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 mt-3`,
    FirstBig && `md:[&>*:first-child]:col-span-2`
  ), "class")}> ${posts.map(async (post) => {
    const { remarkPluginFrontmatter } = await post.render();
    return renderTemplate`${renderComponent($$result, "PostCard", $$PostCard, { "id": post.id, "data": post.data, "slug": post.slug, "readTime": remarkPluginFrontmatter.minutesRead })}`;
  })} </section>`;
}, "/Users/vishakhabhayan/omr_blog/src/components/ListPosts.astro", void 0);

export { $$ListPosts as $ };

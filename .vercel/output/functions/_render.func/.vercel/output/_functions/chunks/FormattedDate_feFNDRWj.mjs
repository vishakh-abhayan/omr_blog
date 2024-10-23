import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from './astro/server_Bv_bxSDw.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://ohmyresume.com");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time class="text-sm font-bold text-opacity-60"${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </time>`;
}, "/Users/vishakhabhayan/omr_blog/src/components/FormattedDate.astro", void 0);

export { $$FormattedDate as $ };

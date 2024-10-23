import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { remarkReadingTime } from './src/utils/readTime.ts'

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.ohmyresume.com', // Update this to your main site URL
	outDir: './dist', // Optionally specify the output directory
	build: {
		assets: '_astro' // Ensure consistent asset directory naming
	},
	markdown: {
		remarkPlugins: [remarkReadingTime],
		drafts: true,
		shikiConfig: {
			theme: 'material-theme-palenight',
			wrap: true
		}
	},
	integrations: [
		mdx({
			syntaxHighlight: 'shiki',
			shikiConfig: {
				experimentalThemes: {
					light: 'vitesse-light',
					dark: 'material-theme-palenight'
				},
				wrap: true
			},
			drafts: true
		}),
		sitemap({
			serialize(item) {
				if (/tags/.test(item.url)) {
					return undefined
				}
				if (/category/.test(item.url)) {
					return undefined
				}
				if (/post/.test(item.url)) {
					item.changefreq = 'weekly'
					item.lastmod = new Date()
					item.priority = 0.5
				}
				return item
			}
		}),
		tailwind()
	]
})

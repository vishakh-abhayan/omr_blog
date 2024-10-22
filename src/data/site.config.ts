interface SiteConfig {
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	author: 'Vishakh Abhayan', // Site author
	title: 'Oh My Resume - Best AI Resume Builder | Articals,Tutorials and Blogs', // Site title.
	description:
		'Create a professional resume in minutes with our AI-driven chat-based resume builder. Tailored for job seekers, powered by advanced AI technology', // Description to display in the meta tags
	lang: 'en-GB',
	ogLocale: 'en_GB',
	shareMessage: 'Share this post', // Message to share a post on social media
	paginationSize: 6 // Number of posts per page
}

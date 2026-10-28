// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.knura.io',
	// Pages are built as flat files (claim-a-tag.html) and linked without ".html".
	// A small CloudFront Function adds ".html" back (see deploy/README.md).
	build: { format: 'file' },
	trailingSlash: 'never',
	integrations: [
		starlight({
			title: 'Knura Docs',
			description: 'How to set up and use Knura: NFC tags whose taps can be proven genuine.',
			logo: { src: './src/assets/knura-mark.svg', alt: 'Knura' },
			favicon: '/favicon.svg',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/knura-dev/knura' },
			],
			editLink: { baseUrl: 'https://github.com/knura-dev/knura-docs/edit/main/' },
			lastUpdated: true,
			components: { SiteTitle: './src/components/SiteTitle.astro' },
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource-variable/jetbrains-mono',
				'./src/styles/knura.css',
			],
			// Groups follow the approved structure. A group is listed here once it has a page.
			sidebar: [
				{
					label: 'Start here',
					items: ['index', 'start-here/at-home-or-hosted', 'start-here/first-verified-tap'],
				},
				{ label: 'Tags', items: ['tags/claim-a-tag', 'tags/set-up-with-phone'] },
				{ label: 'Actions', items: ['actions/webhooks', 'actions/home-assistant', 'actions/matter', 'actions/check-a-webhook-signature'] },
				{ label: 'Run it at home', items: ['home/keys-backup'] },
			],
		}),
	],
});

// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://testdept.co.uk',
	integrations: [
		starlight({
			title: 'AI & Automation Apprenticeship Log',
			description:
				'Learning log, projects, and reflections from a UK AI & Automation Level 4 apprenticeship.',
			social: [
				// PLACEHOLDER: point this at your own GitHub profile/repo, or remove it.
				{ icon: 'github', label: 'GitHub', href: 'https://github.com' },
			],
			sidebar: [
				{
					label: 'Learning Log',
					items: [{ autogenerate: { directory: 'log' } }],
				},
				{
					label: 'Projects',
					items: [{ autogenerate: { directory: 'projects' } }],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Resources', slug: 'resources' },
						{ label: 'Glossary', slug: 'glossary' },
						{ label: 'Certifications', slug: 'certifications' },
					],
				},
			],
		}),
	],
});

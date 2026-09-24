// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { buildLogSidebarGroups } from './src/utils/logSidebar.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://testdept.co.uk',
	integrations: [
		starlight({
			title: 'AI & Automation Apprenticeship Log',
			description:
				'Learning log, projects, and reflections from a UK AI & Automation Level 4 apprenticeship.',
			components: {
				Hero: './src/components/Hero.astro',
				MarkdownContent: './src/components/MarkdownContent.astro',
				PageTitle: './src/components/PageTitle.astro',
				ThemeProvider: './src/components/ThemeProvider.astro',
			},
			sidebar: [
				{
					label: 'Learning Log',
					items: [
						{ label: 'Overview', slug: 'log' },
						{ label: 'Log template', slug: 'log-template' },
						...buildLogSidebarGroups(),
					],
				},
				{
					label: 'Apprenticeship',
					items: [
						{ label: 'KSB tracker', slug: 'ksbs' },
						{ label: 'Off-the-job log', slug: 'otj-log' },
					],
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

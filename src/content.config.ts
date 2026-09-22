import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Used by learning-log and project entries for chronological
				// sorting and topic filtering. Optional so plain docs pages
				// (about, resources, glossary...) don't need them.
				date: z.coerce.date().optional(),
				tags: z.array(z.string()).optional(),
			}),
		}),
	}),
};

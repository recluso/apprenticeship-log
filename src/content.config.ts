import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: ({ image }) =>
				z.object({
					// Used by learning-log and project entries for chronological
					// sorting and topic filtering. Optional so plain docs pages
					// (about, resources, glossary...) don't need them.
					date: z.coerce.date().optional(),
					tags: z.array(z.string()).optional(),
					// Optional cover graphic shown beside the entry when it's
					// featured on the home page. A path relative to the Markdown
					// file, e.g. ../../../assets/covers/my-entry.svg — the build
					// fails if the file doesn't exist, so typos are caught early.
					cover: image().optional(),
					// Describe what the cover shows, for screen-reader users.
					// Leave empty ('') if the image is purely decorative.
					coverAlt: z.string().optional(),
				}),
		}),
	}),
};

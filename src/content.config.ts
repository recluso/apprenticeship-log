import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { KSB_CODES } from './data/ksbs';
import { parseTime } from './utils/time';

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
					// Time spent on this chunk of learning, for off-the-job (OTJ)
					// logs, written like `2h 30m`, `45m` or `3h`. Stored as minutes.
					time: z
						.string()
						.transform((value, ctx) => {
							const minutes = parseTime(value);
							if (minutes === undefined) {
								ctx.addIssue({
									code: z.ZodIssueCode.custom,
									message: `time must look like "2h 30m", "45m" or "3h" (got "${value}")`,
								});
								return z.NEVER;
							}
							return minutes;
						})
						.optional(),
					// Apprenticeship standard KSBs this entry evidences, each with
					// an explanation of why. Codes must exist in src/data/ksbs.ts.
					ksbs: z
						.array(z.object({ code: z.enum(KSB_CODES), why: z.string().min(1) }))
						.optional(),
				}),
		}),
	}),
};

import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { KSB_CODES } from './data/ksbs';
import { parseTime } from './utils/time';
import { toEntryDate } from './utils/entryDate.mjs';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: ({ image }) =>
				z.object({
					// Used by learning-log and project entries for chronological
					// sorting and topic filtering. Optional so plain docs pages
					// (about, resources, glossary...) don't need them. A time
					// (`2026-09-24T14:00`) orders same-day entries; see
					// src/utils/entryDate.mjs.
					date: z
						.preprocess(
							(value) => (value === undefined ? undefined : toEntryDate(value)),
							z.date({ invalid_type_error: 'date must look like 2026-09-24 or 2026-09-24T14:00' }),
						)
						.optional(),
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
					// "Type of Learning Activity" for the OTJ evidence sheet, e.g.
					// "TCG Session", "TCG Set Tasks", "Coaching / Mentoring".
					// Defaults to "Portfolio Work (non-admin)" (see src/utils/otj.ts).
					activityType: z.string().optional(),
					// Link to the Google Doc copy of this entry in the owner's Drive
					// ("Learning log entries" folder). For reference only; not shown.
					gdoc: z.string().url().optional(),
					// Apprenticeship standard KSBs this entry evidences, each with
					// an explanation of why. Codes must exist in src/data/ksbs.ts.
					ksbs: z
						.array(z.object({ code: z.enum(KSB_CODES), why: z.string().min(1) }))
						.optional(),
				}),
		}),
	}),
};

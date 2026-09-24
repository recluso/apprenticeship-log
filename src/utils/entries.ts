import { getCollection } from 'astro:content';

/**
 * Log entries and project write-ups that carry a `date`, newest first.
 * Section index pages (log/index, projects/index) are excluded.
 */
export async function getDatedEntries() {
	return (await getCollection('docs'))
		.filter(
			(entry) =>
				/^(log|projects)\//.test(entry.id) && !entry.id.endsWith('/index') && entry.data.date
		)
		.sort((a, b) => b.data.date!.getTime() - a.data.date!.getTime());
}

export function formatDate(date: Date): string {
	// UTC, so an entry's time never moves it on to another day (see entryDate.mjs).
	return date.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		timeZone: 'UTC',
	});
}

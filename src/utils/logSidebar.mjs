// Builds Starlight sidebar groups for the Learning Log, bucketed by the
// Monday-starting week each entry's `date` falls in. Runs at config-load
// time (before content collections are queryable), so it reads frontmatter
// straight off disk — add a new entry file and its week group appears (or
// gains an item) automatically, no sidebar editing required.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR = path.join(__dirname, '../content/docs/log');

function startOfWeekMonday(date) {
	const d = new Date(date);
	const day = d.getDay();
	const diff = (day === 0 ? -6 : 1) - day;
	d.setDate(d.getDate() + diff);
	d.setHours(0, 0, 0, 0);
	return d;
}

function formatUKShortDate(date) {
	const dd = String(date.getDate()).padStart(2, '0');
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const yy = String(date.getFullYear()).slice(-2);
	return `${dd}/${mm}/${yy}`;
}

export function buildLogSidebarGroups() {
	const files = readdirSync(LOG_DIR).filter(
		(f) => (f.endsWith('.md') || f.endsWith('.mdx')) && !f.startsWith('index.'),
	);

	const entries = files.map((filename) => {
		const raw = readFileSync(path.join(LOG_DIR, filename), 'utf-8');
		const { data } = matter(raw);
		const slug = filename.replace(/\.mdx?$/, '');
		return {
			title: data.title ?? slug,
			date: new Date(data.date),
			slug: `log/${slug}`,
		};
	});

	entries.sort((a, b) => b.date.getTime() - a.date.getTime());

	const weekMap = new Map();
	for (const entry of entries) {
		const weekStart = startOfWeekMonday(entry.date);
		const key = weekStart.toISOString();
		if (!weekMap.has(key)) weekMap.set(key, { weekStart, entries: [] });
		weekMap.get(key).entries.push(entry);
	}

	const weeks = [...weekMap.values()].sort(
		(a, b) => b.weekStart.getTime() - a.weekStart.getTime(),
	);

	return weeks.map((week) => ({
		label: `Week commencing ${formatUKShortDate(week.weekStart)}`,
		items: week.entries.map((e) => ({ label: e.title, slug: e.slug })),
	}));
}

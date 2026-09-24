// Off-the-job (OTJ) evidence in the format of the training provider's
// "OFF THE JOB - WEEKLY EVIDENCE" spreadsheet: one row per log entry, and
// per-week CSVs that reproduce the whole form (title, name, month/year,
// table, total and declaration).
import type { getDatedEntries } from './entries';
import { KSB_CODES } from '../data/ksbs';

type Entry = Awaited<ReturnType<typeof getDatedEntries>>[number];

/**
 * Printed in the "Apprentice Name:" row of the weekly CSVs. Note the CSVs
 * are public on the site; set to '' to leave the row blank.
 */
export const APPRENTICE_NAME = 'Sacha de Sousa Pontes Wellborn';

/** Used when an entry has no `activityType` in its frontmatter. */
export const DEFAULT_ACTIVITY_TYPE = 'Portfolio Work (non-admin)';

export const OTJ_COLUMNS = [
	'Date of the Activity',
	'Type of Learning Activity',
	'Details of the Learning Activity',
	'What did you learn from this and how will you use what you have learnt?',
	'Did this learning contribute to the KSBs of your apprenticeship?',
	'Duration (HH:MM)',
	'Knowledge, Skill, Behaviour',
];

const pad = (n: number) => String(n).padStart(2, '0');

/** 24 Sept 2026 → "24/09/2026" (dates are stored as UTC midnight). */
export const ukDate = (date: Date) =>
	`${pad(date.getUTCDate())}/${pad(date.getUTCMonth() + 1)}/${date.getUTCFullYear()}`;

/** 150 → "02:30", 605 → "10:05". */
export const hhmm = (minutes: number) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;

/** The Monday starting the week a date falls in, as "YYYY-MM-DD". */
export function weekKey(date: Date): string {
	const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
	const day = d.getUTCDay();
	d.setUTCDate(d.getUTCDate() + (day === 0 ? -6 : 1 - day));
	return d.toISOString().slice(0, 10);
}

/** Plain text of one `## Heading` section of an entry's Markdown body. */
export function sectionText(body: string, heading: string): string {
	const lines = body.split('\n');
	const start = lines.findIndex((line) => line.trim().toLowerCase() === `## ${heading}`.toLowerCase());
	if (start === -1) return '';
	const end = lines.findIndex((line, i) => i > start && /^##\s/.test(line));
	return markdownToText(lines.slice(start + 1, end === -1 ? undefined : end).join('\n'));
}

/** Rough Markdown → plain text: keeps list items and code lines, joins wrapped lines. */
export function markdownToText(markdown: string): string {
	const CODE = '\u0000'; // marks code lines so their text is left untouched
	const out: string[] = [];
	let inCode = false;
	for (const raw of markdown.split('\n')) {
		if (/^\s*(```|~~~)/.test(raw)) {
			inCode = !inCode;
			continue;
		}
		if (inCode) {
			out.push(CODE + raw);
			continue;
		}
		const line = raw.trim();
		const heading = /^#{1,6}\s+(.*)$/.exec(line);
		const item = /^(?:[-*]|\d+\.)\s+(.*)$/.exec(line);
		if (heading) out.push('', `${heading[1]}:`);
		else if (item) out.push(`• ${item[1]}`);
		else if (line === '') out.push('');
		// A wrapped continuation of the previous paragraph or list item.
		else if (out.length && out[out.length - 1] !== '' && !out[out.length - 1].startsWith(CODE))
			out[out.length - 1] += ` ${line}`;
		else out.push(line);
	}
	// Inline formatting is stripped after rejoining, so marks split across
	// wrapped source lines (e.g. **bold\ntext**) are removed too.
	const plain = (text: string) =>
		text
			.replace(/<[^>]+>/g, '')
			.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
			.replace(/`([^`]*)`/g, '$1')
			.replace(/\*\*([^*]+)\*\*/g, '$1')
			.replace(/(^|[^*\w])\*([^*\s][^*]*)\*/g, '$1$2');
	return out
		.map((line) => (line.startsWith(CODE) ? line.slice(1) : plain(line)))
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

/** One spreadsheet row for an entry, in OTJ_COLUMNS order. */
export function otjRow(entry: Entry): string[] {
	const { data, body = '' } = entry;
	const learned = [sectionText(body, 'What I learned'), sectionText(body, 'Reflection')]
		.filter(Boolean)
		.join('\n\n');
	const codes = [...(data.ksbs ?? [])]
		.map(({ code }) => code)
		.sort((a, b) => KSB_CODES.indexOf(a) - KSB_CODES.indexOf(b));
	return [
		ukDate(data.date!),
		data.activityType ?? DEFAULT_ACTIVITY_TYPE,
		data.description ? `${data.title} — ${data.description}` : data.title,
		learned,
		codes.length ? 'Yes' : 'No',
		data.time !== undefined ? hhmm(data.time) : '',
		codes.join(', '),
	];
}

/** Groups entries (oldest first) by the Monday of their week. */
export function groupByWeek(entries: Entry[]): Map<string, Entry[]> {
	const weeks = new Map<string, Entry[]>();
	for (const entry of [...entries].sort((a, b) => a.data.date!.getTime() - b.data.date!.getTime())) {
		const key = weekKey(entry.data.date!);
		weeks.set(key, [...(weeks.get(key) ?? []), entry]);
	}
	return weeks;
}

export const totalMinutes = (entries: Entry[]) =>
	entries.reduce((sum, entry) => sum + (entry.data.time ?? 0), 0);

/** The weekly form, laid out like the provider's spreadsheet. */
export function weeklyForm(monday: string, entries: Entry[]): string[][] {
	const date = new Date(`${monday}T00:00:00Z`);
	const blank = [''];
	return [
		['', '', 'OFF THE JOB - WEEKLY EVIDENCE'],
		['Apprentice Name:', APPRENTICE_NAME],
		['Month:', date.toLocaleDateString('en-GB', { month: 'long', timeZone: 'UTC' })],
		['Year: ', String(date.getUTCFullYear())],
		blank,
		blank,
		OTJ_COLUMNS,
		...entries.map(otjRow),
		blank,
		['', '', '', '', 'TOTAL OFF-THE-JOB HOURS', hhmm(totalMinutes(entries))],
		blank,
		['DECLARATION'],
		['·        The training listed above has been undertaken within my normal working hours'],
		[
			'·         The training is directly relevant to, and provided new knowledge, skills or behaviours required to, achieve my apprenticeship.',
		],
	];
}

/** Serialises rows as CSV, with a BOM so Excel reads it as UTF-8. */
export function toCsv(rows: string[][]): string {
	const cell = (value: string) => `"${value.replaceAll('"', '""')}"`;
	return '\uFEFF' + rows.map((row) => row.map(cell).join(',')).join('\r\n') + '\r\n';
}

export const csvResponse = (rows: string[][]) =>
	new Response(toCsv(rows), { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });

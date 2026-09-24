// Reads an entry's `date` frontmatter the same way everywhere: the content
// schema, the sidebar (which reads frontmatter straight off disk) and the
// Google Doc script.
//
// `date` can be a day (`2026-09-24`) or a day and time (`2026-09-24T14:00` or
// `2026-09-24T14:00:00`). The time only orders entries written on the same
// day, so the newest one is featured and listed first; it is never shown.
// Times are treated as UTC, and every date on the site is displayed in UTC,
// so the day shown is always the day written, whatever time zone the site is
// built in.
//
// YAML turns `2026-09-24` and `2026-09-24T14:00:00` into Dates (at UTC) but
// leaves `2026-09-24T14:00` as text, which JavaScript would otherwise read in
// the local time zone; this treats all three alike.
export function toEntryDate(value) {
	if (value instanceof Date) return value;
	if (typeof value !== 'string') return new Date(Number.NaN);

	const text = value.trim();
	if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return new Date(`${text}T00:00:00Z`);
	if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(text)) return new Date(`${text}Z`);
	return new Date(text);
}

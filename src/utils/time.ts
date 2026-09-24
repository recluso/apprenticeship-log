// Time spent on an entry is written in frontmatter as e.g. `2h 30m`, `45m`
// or `3h`, and stored as a number of minutes.

export const TIME_PATTERN = /^\s*(?:(\d+)\s*h)?\s*(?:(\d+)\s*m)?\s*$/i;

export function parseTime(value: string): number | undefined {
	const match = TIME_PATTERN.exec(value);
	if (!match || (match[1] === undefined && match[2] === undefined)) return undefined;
	return Number(match[1] ?? 0) * 60 + Number(match[2] ?? 0);
}

/** 150 → "2h 30m", 45 → "45m", 180 → "3h". */
export function formatMinutes(minutes: number): string {
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	if (h && m) return `${h}h ${m}m`;
	return h ? `${h}h` : `${m}m`;
}

/** 150 → "2.50" — decimal hours, handy for spreadsheets. */
export function toDecimalHours(minutes: number): string {
	return (minutes / 60).toFixed(2);
}

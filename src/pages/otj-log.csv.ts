// Builds /otj-log.csv: one row per dated log entry or project, oldest first,
// for importing into an off-the-job (OTJ) hours spreadsheet.
import type { APIRoute } from 'astro';
import { getDatedEntries } from '../utils/entries';
import { formatMinutes, toDecimalHours } from '../utils/time';

const csvCell = (value: string) => `"${value.replaceAll('"', '""')}"`;

export const GET: APIRoute = async ({ site }) => {
	const entries = (await getDatedEntries()).reverse();
	const rows = [
		['Date', 'Title', 'Time', 'Hours', 'KSBs', 'Description', 'URL'],
		...entries.map((entry) => [
			entry.data.date!.toISOString().slice(0, 10),
			entry.data.title,
			entry.data.time !== undefined ? formatMinutes(entry.data.time) : '',
			entry.data.time !== undefined ? toDecimalHours(entry.data.time) : '',
			(entry.data.ksbs ?? []).map(({ code }) => code).join(' '),
			entry.data.description ?? '',
			new URL(`/${entry.id}/`, site).href,
		]),
	];
	// Leading BOM so Excel reads the file as UTF-8.
	const body = '﻿' + rows.map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
	return new Response(body, { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
};

// Builds /otj-log.csv: every dated log entry or project, oldest first, as
// rows in the provider's "OFF THE JOB - WEEKLY EVIDENCE" column format —
// ready to paste into the evidence spreadsheet.
import type { APIRoute } from 'astro';
import { getDatedEntries } from '../utils/entries';
import { OTJ_COLUMNS, csvResponse, otjRow } from '../utils/otj';

export const GET: APIRoute = async () => {
	const entries = (await getDatedEntries()).reverse();
	return csvResponse([OTJ_COLUMNS, ...entries.map(otjRow)]);
};

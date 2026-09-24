// Builds one CSV per week, e.g. /otj-log/week-2026-09-21.csv (the Monday
// the week starts), laid out as the provider's full weekly evidence form.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getDatedEntries } from '../../utils/entries';
import { csvResponse, groupByWeek, weeklyForm } from '../../utils/otj';

export const getStaticPaths = (async () => {
	const weeks = groupByWeek(await getDatedEntries());
	return [...weeks].map(([monday, entries]) => ({
		params: { week: `week-${monday}` },
		props: { monday, entries },
	}));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => csvResponse(weeklyForm(props.monday, props.entries));

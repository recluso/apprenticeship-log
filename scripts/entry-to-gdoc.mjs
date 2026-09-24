// Turns a built log entry into clean HTML for a Google Doc that mirrors it.
//
//   npm run build
//   node scripts/entry-to-gdoc.mjs log/2026-09-24-crm-data-cleaning-and-prompting > entry.html
//
// The HTML (title, date, time, KSB summary, the entry's content, then each
// KSB with its explanation and official wording) is then uploaded to Google
// Drive as a Google Doc — see "Google Doc copies" in AGENTS.md.
import { readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { ELEMENT_NODE, TEXT_NODE, parse, renderSync, walkSync } from 'ultrahtml';
import { querySelector } from 'ultrahtml/selector';
import { KSBS, KSB_CODES, KSB_STANDARD } from '../src/data/ksbs.ts';
import { parseTime, formatMinutes, toDecimalHours } from '../src/utils/time.ts';

const SITE = 'https://testdept.co.uk';

const slug = process.argv[2]?.replace(/^\/|\/$/g, '').replace(/\.md$/, '');
if (!slug) {
	console.error('Usage: node scripts/entry-to-gdoc.mjs log/<entry-file-name>');
	process.exit(1);
}

const { data } = matter(await readFile(`src/content/docs/${slug}.md`, 'utf8'));
const builtHtml = await readFile(`dist/${slug}/index.html`, 'utf8').catch(() => {
	console.error(`dist/${slug}/index.html not found — run "npm run build" first.`);
	process.exit(1);
});

const escape = (text) =>
	String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
// `code` and *emphasis* marks, as used in KSB explanations.
const inline = (text) =>
	escape(text)
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>');
const hasClass = (node, name) => (node.attributes?.class ?? '').split(/\s+/).includes(name);
// Text from the parsed page is still HTML-encoded, so it's safe to output as-is.
const textOf = (node) => {
	let text = '';
	walkSync(node, (n) => {
		if (n.type === TEXT_NODE) text += n.value;
	});
	return text;
};

// --- The entry's own content, cleaned up for Google Docs ------------------
const content = querySelector(parse(builtHtml), '.sl-markdown-content');
const remove = [];
walkSync(content, (node) => {
	if (node.type !== ELEMENT_NODE) return;
	if (
		['svg', 'script', 'link', 'button', 'figcaption', 'style'].includes(node.name) ||
		hasClass(node, 'sl-anchor-link') ||
		hasClass(node, 'ksb-section') // rebuilt below from frontmatter
	) {
		remove.push(node);
		return;
	}
	// Code blocks: collapse Expressive Code's markup into a plain <pre>.
	if (hasClass(node, 'expressive-code')) {
		const lines = [];
		walkSync(node, (n) => {
			if (n.type === ELEMENT_NODE && hasClass(n, 'ec-line')) lines.push(textOf(n));
		});
		node.name = 'pre';
		node.attributes = {};
		node.children = [{ type: TEXT_NODE, value: lines.join('\n'), parent: node }];
		return;
	}
	// Aside titles ("Study guide") become bold.
	if (hasClass(node, 'starlight-aside__title')) {
		node.name = 'p';
		node.children = [{ type: TEXT_NODE, value: `<strong>${textOf(node).trim()}</strong>`, parent: node }];
	}
	// Links: make site-relative links absolute.
	const href = node.attributes?.href;
	const keep = {};
	if (node.name === 'a' && href) keep.href = href.startsWith('/') ? SITE + href : href;
	node.attributes = keep;
});
for (const node of remove) {
	node.parent.children = node.parent.children.filter((child) => child !== node);
}
const body = content.children.map((child) => renderSync(child)).join('');

// --- Header and KSB section, from frontmatter ------------------------------
const url = `${SITE}/${slug}/`;
const date = new Date(data.date).toLocaleDateString('en-GB', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
});
const minutes = data.time ? parseTime(String(data.time)) : undefined;
const ksbs = [...(data.ksbs ?? [])].sort(
	(a, b) => KSB_CODES.indexOf(a.code) - KSB_CODES.indexOf(b.code)
);

const html = `<html><head><meta charset="utf-8"><title>${escape(data.title)}</title></head><body>
<h1>${escape(data.title)}</h1>
<p><strong>Date:</strong> ${date}${
	minutes !== undefined
		? ` &nbsp;·&nbsp; <strong>Time spent:</strong> ${formatMinutes(minutes)} (${toDecimalHours(minutes)} hours)`
		: ''
}</p>
${ksbs.length ? `<p><strong>KSBs:</strong> ${ksbs.map((k) => k.code).join(', ')}</p>` : ''}
<p><strong>Web version:</strong> <a href="${url}">${url}</a></p>
<p><em>${escape(data.description ?? '')}</em></p>
<hr>
${body}
${
	ksbs.length
		? `<h2>Apprenticeship KSBs</h2>
<p>How this entry evidences the ${KSB_STANDARD.reference} ${escape(KSB_STANDARD.name)} standard (level ${KSB_STANDARD.level}, version ${KSB_STANDARD.version}).</p>
${ksbs
	.map(
		({ code, why }) => `<h3>${code} – ${escape(KSBS[code].label)}</h3>
<p>${inline(why)}</p>
<p><em>Official wording: ${escape(KSBS[code].text)}</em></p>`
	)
	.join('\n')}`
		: ''
}
</body></html>
`;

process.stdout.write(html);

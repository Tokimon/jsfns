import type { Summary } from '~/scripts/types';

export const buildSummary = (summary: Summary[] = []) =>
	summary
		.map(({ text }) => text)
		.join('\n\n')
		.trim();

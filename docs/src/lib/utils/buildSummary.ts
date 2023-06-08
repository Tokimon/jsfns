import type { Summary } from '../types';

export const buildSummary = (summary: Summary[] = []) =>
	summary
		.map(({ text }) => text)
		.join('\n\n')
		.trim();

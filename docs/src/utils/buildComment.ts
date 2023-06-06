import type { DocComment } from '../types';

export function buildComment(comment?: DocComment) {
	if (!comment) return '';
	return ((comment.shortText ?? '') + '\n\n' + (comment.text ?? '')).trim();
}

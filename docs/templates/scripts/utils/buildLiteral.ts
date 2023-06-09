import { Type_Literal } from '~/scripts/types';

export function buildLiteral({ value }: Type_Literal) {
	const float = parseFloat(value);
	return Number.isNaN(float) ? `'${value}'` : value;
}

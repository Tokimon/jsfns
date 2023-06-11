import { Type_Literal } from '../types';

export function buildLiteral({ value }: Type_Literal) {
  const float = parseFloat(value);
  return Number.isNaN(float) ? `'${value}'` : value;
}

import { type Type_Literal } from '../types';
import { type TypeStringOptions } from './typeString';

export function buildLiteral({ value }: Type_Literal, options?: TypeStringOptions) {
  if (value == null) return options?.nonNull ? '' : value;

  const float = parseFloat(value);
  return Number.isNaN(float) ? `'${value}'` : value;
}

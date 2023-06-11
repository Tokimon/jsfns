import type { Type_Reference } from '../types';
import type { TypeStringFunction } from './typeString';

export function buildReference(typeString: TypeStringFunction, type: Type_Reference) {
  const { name, typeArguments } = type;
  if (!typeArguments?.length) return name;
  return `${name}<${typeArguments.map(typeString).join(', ')}>`;
}

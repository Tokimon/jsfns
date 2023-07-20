import type { Type_Reference } from '../types';
import type { TypeStringFunction, TypeStringOptions } from './typeString';

export function buildReference(typeString: TypeStringFunction, type: Type_Reference, options?: TypeStringOptions) {
  // eslint-disable-next-line prefer-const
  let { name, typeArguments } = type;
  typeArguments = typeArguments?.filter((t) => t.type === 'reference' && t.target !== -1);

  if (!typeArguments?.length) return name;

  if (name === 'NonNullable') return typeString(typeArguments[0], { nonNull: true });

  return `${name}<${typeArguments.map((type) => typeString(type, options)).join(', ')}>`;
}

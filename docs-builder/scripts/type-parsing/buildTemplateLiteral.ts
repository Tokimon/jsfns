import { type Type_TemplateLiteral } from '~docs-builder/types';
import type { TypeStringFunction, TypeStringOptions } from './typeString';

const parseEntry = (
  typeString: TypeStringFunction,
  entry: Type_TemplateLiteral['head'] | Type_TemplateLiteral['tail'],
  options?: TypeStringOptions
): string => {
  if (!Array.isArray(entry)) {
    if (typeof entry === 'string') return entry;
    return `\${${typeString(entry, options)}}`;
  }

  return entry.map((ent) => parseEntry(typeString, ent, options)).join('');
};

export function buildTemplateLiteral(typeString: TypeStringFunction, type: Type_TemplateLiteral, options?: TypeStringOptions) {
  return `\`${parseEntry(typeString, type.head, options)}${parseEntry(typeString, type.tail, options)}\``;
}

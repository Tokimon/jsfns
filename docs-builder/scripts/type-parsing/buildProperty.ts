import type { All_Types, Flags, Kind_Param, Kind_Property } from '../types';
import { buildComment } from './buildComment';
import type { TypeStringFunction, TypeStringOptions } from './typeString';

type PropertyLikeProp = {
  name: string;
  flags: Flags;
  type: All_Types;
  defaultValue?: string;
};

export function buildPropertyLike(typeString: TypeStringFunction, prop: PropertyLikeProp) {
  const { name, flags, type, defaultValue } = prop;
  const optional = flags.isOptional ? '?' : '';
  const defVal = defaultValue ? ' = ' + defaultValue : '';
  const typeStr = `${typeString(type)}${defVal}`;

  return name === '__namedParameters' ? typeStr : `${name}${optional}: ${typeStr}`;
}

export function buildProperty(typeString: TypeStringFunction, prop: Kind_Property) {
  const opts: Required<Pick<TypeStringOptions, 'commentExtractor'>> = { commentExtractor: [] };
  if (prop.comment) opts.commentExtractor.push(...buildComment(prop.comment));

  let property = buildPropertyLike((type) => typeString(type, opts), prop);

  if (opts.commentExtractor.length) {
    property = '// ' + opts.commentExtractor.join('\n// ') + '\n' + property;
  }

  return property;
}

export function buildParam(typeString: TypeStringFunction, prop: Kind_Param, options?: TypeStringOptions) {
  if (options?.commentExtractor && prop.comment) options.commentExtractor.push(...buildComment(prop.comment));
  return buildPropertyLike(typeString, prop);
}

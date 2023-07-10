import type { All_Types, Flags, Kind_Param, Kind_Property } from '../types';
import type { TypeStringFunction } from './typeString';

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

  return `${name}${optional}: ${typeString(type)}${defVal}`;
}

export function buildProperty(typeString: TypeStringFunction, prop: Kind_Property | Kind_Param) {
  const { name, flags, type, defaultValue } = prop;
  return buildPropertyLike(typeString, { name, flags, type, defaultValue });
}

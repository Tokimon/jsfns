import type { Kind_Property } from '../types';
import { buildProperty } from './buildProperty';
import type { TypeStringFunction } from './typeString';

export function buildObject(typeString: TypeStringFunction, properties: Kind_Property[]) {
  const props = properties.flatMap((prop) => buildProperty(typeString, prop).split('\n'));
  return props.length ? `{\n  ${props.join('\n  ')}\n}` : '{}';
}

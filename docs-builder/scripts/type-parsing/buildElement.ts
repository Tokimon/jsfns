import type { Element_NamedTupleMember } from '../types';
import { buildPropertyLike } from './buildProperty';
import type { TypeStringFunction } from './typeString';

export function buildElement(typeString: TypeStringFunction, prop: Element_NamedTupleMember) {
  const { name, isOptional, element, defaultValue } = prop;
  return buildPropertyLike(typeString, {
    name,
    flags: { isOptional },
    type: element,
    defaultValue,
  });
}

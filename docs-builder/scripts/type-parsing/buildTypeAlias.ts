import type { Kind_TypeAlias } from '../types';
import { createTypeString } from './typeString';

export const buildTypeAlias = (type: Kind_TypeAlias) =>
  `type ${type.name} = ${createTypeString(type.name)(type.type)};`;

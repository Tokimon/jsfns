import type { Kind_TypeAlias } from '~/scripts/types';
import { createTypeString } from '~/scripts/utils/typeString';

export const buildTypeAlias = (type: Kind_TypeAlias) =>
	`type ${type.name} = ${createTypeString(type.name)(type.type)};`;

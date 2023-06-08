import type { TypeAliasKind } from '$lib/types';
import { createTypeString } from './typeString';

export const buildTypeAlias = (name: string, alias?: TypeAliasKind) => {
	if (!alias) return '';
	return `type ${name} = ${createTypeString(name)(alias.type)};`;
};

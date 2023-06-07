import type { TypeAliasKind } from 'src/types';
import { createTypeString } from './typeString';

export const buildTypeAlias = (name: string, alias?: TypeAliasKind) => {
	if (!alias) return '';
	return `type ${name} = ${createTypeString(name)(alias.type)};`;
};

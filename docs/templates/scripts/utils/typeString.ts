import type { All_Types } from '~/scripts/types';
import { buildArray } from '~/scripts/utils/buildArray';
import { buildPredicate } from '~/scripts/utils/buildPredicate';
import { buildElement } from '~/scripts/utils/buildProperty';
import { buildReflection } from '~/scripts/utils/buildReflection';
import { buildTuple } from '~/scripts/utils/buildTuple';
import { buildLiteral } from './buildLiteral';
import { buildReference } from './buildReference';

export type TypeStringFunction = (type: All_Types) => string;

export const createTypeString = (functionName: string, customTypes?: string[]) => {
	const typeString: TypeStringFunction = (type) => {
		switch (type.type) {
			case 'tuple':
				return buildTuple(typeString, type);
			case 'namedTupleMember':
				return buildElement(typeString, type);
			case 'array':
				return buildArray(type);
			case 'predicate':
				return buildPredicate(type);
			case 'reflection':
				return buildReflection(typeString, type);
			case 'intrinsic':
				return type.name;
			case 'literal':
				return buildLiteral(type);
			case 'reference': {
				if (type.package !== 'typescript') customTypes?.push(type.name);
				return buildReference(typeString, type);
			}
			case 'intersection':
				return type.types.map(typeString).join(' & ');
			case 'union':
				return type.types.map(typeString).join(' | ');
		}
	};

	return typeString;
};

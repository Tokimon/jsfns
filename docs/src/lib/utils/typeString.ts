import type { DocType, DocTypeReflection } from '../types';
import { buildFunction } from './buildFunction';
import { buildObject } from './buildObject';

export type TypeStringFunction = (type: DocType) => string;

export const createTypeString = (name: string, typeReferences?: string[]) => {
	const typeString: TypeStringFunction = (type) => {
		switch (type.type) {
			case 'intrinsic':
				return type.name;
			case 'tuple':
				return `[${type.elements?.map(typeString).join(', ')}]`;
			case 'named-tuple-member':
				return `${type.name}${type.isOptional ? '?' : ''}: ${typeString(type.element)}`;
			case 'array':
				return type.elementType.name + '[]';
			case 'reference': {
				if (type.package !== 'typescript') typeReferences?.push(type.name);
				return type.name;
			}
			case 'predicate':
				return `boolean (${type.name} is ${type.targetType.name})`;
			case 'intersection':
				return type.types.map((t) => typeString(t)).join(' & ');
			case 'reflection':
				return handleReflection(name, typeString, type);
			case 'union':
				return type.types.map(typeString).join(' | ');
			default:
				return type.type;
		}
	};

	return typeString;
};

function handleReflection(name: string, typeString: TypeStringFunction, type: DocTypeReflection) {
	const { children, signatures } = type.declaration;
	if (children) return buildObject(typeString, children);
	if (signatures) return signatures.map((sig) => buildFunction(typeString, name, sig)).join(' | ');
	return '';
}

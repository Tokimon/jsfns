import type { Type_Reference } from '~/scripts/types';
import type { TypeStringFunction } from '~/scripts/utils/typeString';

export function buildReference(typeString: TypeStringFunction, type: Type_Reference) {
	const { name, typeArguments } = type;
	if (!typeArguments?.length) return name;
	return `${name}<${typeArguments.map(typeString).join(', ')}>`;
}

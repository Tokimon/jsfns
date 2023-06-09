import type { TypeStringFunction } from '~/scripts/utils/typeString';
import type { Type_Reflection } from '~/scripts/types';
import { buildFunctionType } from '~/scripts/utils/buildFunctionType';
import { buildObject } from '~/scripts/utils/buildObject';

export function buildReflection(typeString: TypeStringFunction, type: Type_Reflection) {
	const { children, signatures } = type.declaration;
	if (children) return buildObject(typeString, children);
	if (signatures) return signatures.map((sig) => buildFunctionType(typeString, sig)).join(' | ');
	return '';
}

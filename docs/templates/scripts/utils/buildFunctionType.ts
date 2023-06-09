import { buildProperty } from '~/scripts/utils/buildProperty';
import type { TypeStringFunction } from '~/scripts/utils/typeString';
import type { Kind_Signature } from '~/scripts/types';

export const buildFunctionType = (typeString: TypeStringFunction, signature: Kind_Signature) => {
	const params = signature.parameters?.map((param) => buildProperty(typeString, param));

	return `(${params?.join(', ')}) => ${typeString(signature.type)}`;
};

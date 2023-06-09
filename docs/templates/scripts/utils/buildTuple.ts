import { Type_Tuple } from '~/scripts/types';
import { TypeStringFunction } from '~/scripts/utils/typeString';

export const buildTuple = (typeString: TypeStringFunction, type: Type_Tuple) =>
	`[${type.elements?.map(typeString).join(', ')}]`;

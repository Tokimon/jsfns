import { Type_Tuple } from '~/scripts/types';
import { TypeStringFunction } from './typeString';

export const buildTuple = (typeString: TypeStringFunction, type: Type_Tuple) =>
  `[${type.elements?.map(typeString).join(', ')}]`;

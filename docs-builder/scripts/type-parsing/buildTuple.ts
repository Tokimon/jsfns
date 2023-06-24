import { type Type_Tuple } from '../types';
import { type TypeStringFunction } from './typeString';

export const buildTuple = (typeString: TypeStringFunction, type: Type_Tuple) => `[${type.elements?.map(typeString).join(', ')}]`;

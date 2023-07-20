import { type Type_Array } from '../types';
import { type TypeStringFunction } from './typeString';

export const buildArray = (typeString: TypeStringFunction, type: Type_Array) => {
  let typeStr = typeString(type.elementType);
  if (/[|&]/.test(typeStr)) typeStr = `(${typeStr})`;
  return typeStr + '[]';
};

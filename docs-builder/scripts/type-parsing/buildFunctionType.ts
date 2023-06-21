import type { Kind_Signature } from '../types';
import { buildProperty } from './buildProperty';
import type { TypeStringFunction } from './typeString';

export const buildFunctionType = (typeString: TypeStringFunction, signature: Kind_Signature) => {
  const params = signature.parameters?.map((param) => buildProperty(typeString, param)) || [];

  return `(${params.join(', ')}) => ${typeString(signature.type)}`;
};

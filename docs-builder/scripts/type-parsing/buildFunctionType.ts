import type { Kind_Signature } from '../types';
import { buildParam } from './buildProperty';
import type { TypeStringFunction } from './typeString';

export const buildFunctionType = (typeString: TypeStringFunction, signature: Kind_Signature) => {
  const params = signature.parameters?.map((param) => buildParam(typeString, param)) || [];

  return `(${params.join(', ')}) => ${typeString(signature.type)}`;
};

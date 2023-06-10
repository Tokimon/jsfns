import { buildProperty } from './buildProperty';
import type { TypeStringFunction } from './typeString';
import type { Kind_Signature } from '~/scripts/types';

export const buildFunction = (
  typeString: TypeStringFunction,
  name: string,
  signature: Kind_Signature
) => {
  const params = signature.parameters?.map((param) => buildProperty(typeString, param));

  return `${name}(${params?.join(', ')}): ${typeString(signature.type)}`;
};

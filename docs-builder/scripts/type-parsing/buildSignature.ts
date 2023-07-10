import type { Kind_Signature } from '../types';
import { buildProperty } from './buildProperty';
import type { TypeStringFunction } from './typeString';

export const buildSignature = (typeString: TypeStringFunction, name: string, signature: Kind_Signature) => {
  const { type, parameters, typeParameter } = signature;
  const params = parameters?.map((param) => buildProperty(typeString, param)) || [];

  let typeDef = typeParameter
    ?.filter(({ flags }) => !flags?.isExternal)
    .map((t) => {
      const ext = t.type ? ` extends ${typeString(t.type)}` : '';
      return `${t.name}${ext}`;
    })
    .join(', ');

  if (typeDef) typeDef = `<${typeDef}>`;

  return `${name}${typeDef || ''}(${params.join(', ')}): ${typeString(type)}`;
};

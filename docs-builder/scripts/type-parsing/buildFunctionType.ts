import type { Kind_Signature } from '../types';
import { buildComment } from './buildComment';
import { buildParam } from './buildProperty';
import type { TypeStringFunction, TypeStringOptions } from './typeString';

export const buildFunctionType = (typeString: TypeStringFunction, signature: Kind_Signature, options?: TypeStringOptions) => {
  const { type, parameters, comment } = signature;
  if (options?.commentExtractor && comment) options.commentExtractor.push(...buildComment(comment));
  const params = parameters?.map((param) => buildParam(typeString, param)) || [];

  return `(${params.join(', ')}) => ${typeString(type, options)}`;
};

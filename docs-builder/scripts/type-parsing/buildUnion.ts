import { type Type_Union } from '~docs-builder/types';
import { buildTypeCollection } from './buildTypeCollection';
import { type TypeStringFunction, type TypeStringOptions } from './typeString';

export const buildUnion = (typeString: TypeStringFunction, type: Type_Union, options?: TypeStringOptions) =>
  buildTypeCollection(typeString, type.types, options).join(' | ');

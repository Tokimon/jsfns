import { type Type_Tuple } from '~docs-builder/types';
import { buildTypeCollection } from './buildTypeCollection';
import { type TypeStringFunction, type TypeStringOptions } from './typeString';

export const buildTuple = (typeString: TypeStringFunction, type: Type_Tuple, options?: TypeStringOptions) =>
  `[${buildTypeCollection(typeString, type.elements, options).join(', ')}]`;

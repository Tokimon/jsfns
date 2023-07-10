import { type Type_Intersection } from '~docs-builder/types';
import { buildTypeCollection } from './buildTypeCollection';
import { type TypeStringFunction, type TypeStringOptions } from './typeString';

export const buildIntersection = (typeString: TypeStringFunction, type: Type_Intersection, options?: TypeStringOptions) =>
  buildTypeCollection(typeString, type.types, options).join(' & ');

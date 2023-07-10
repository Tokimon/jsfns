import type { All_Types } from '../types';
import { buildArray } from './buildArray';
import { buildElement } from './buildElement';
import { buildIntersection } from './buildIntersection';
import { buildIntrinsic } from './buildIntrinsic';
import { buildLiteral } from './buildLiteral';
import { buildPredicate } from './buildPredicate';
import { buildReference } from './buildReference';
import { buildReflection } from './buildReflection';
import { buildTuple } from './buildTuple';
import { buildUnion } from './buildUnion';

export type TypeStringOptions = { nonNull?: boolean };
export type TypeStringFunction = (type: All_Types, options?: TypeStringOptions) => string;

export const createTypeString = (customTypes?: string[]) => {
  const typeString: TypeStringFunction = (type, options) => {
    switch (type.type) {
      case 'array':
        return buildArray(type);
      case 'predicate':
        return buildPredicate(type);
      case 'intrinsic':
        return buildIntrinsic(type, options);
      case 'literal':
        return buildLiteral(type, options);
      case 'query':
        return typeString(type.queryType);
      case 'tuple':
        return buildTuple(typeString, type, options);
      case 'intersection':
        return buildIntersection(typeString, type, options);
      case 'union':
        return buildUnion(typeString, type, options);
      case 'namedTupleMember':
        return buildElement(typeString, type);
      case 'reflection':
        return buildReflection(typeString, type);
      case 'reference': {
        if (type.package !== 'typescript') customTypes?.push(type.name);
        return buildReference(typeString, type);
      }
    }
  };

  return typeString;
};

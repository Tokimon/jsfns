import type { All_Types } from '../types';
import { buildArray } from './buildArray';
import { buildIntersection } from './buildIntersection';
import { buildIntrinsic } from './buildIntrinsic';
import { buildLiteral } from './buildLiteral';
import { buildNamedTupleMember } from './buildNamedTupleMember';
import { buildPredicate } from './buildPredicate';
import { buildReference } from './buildReference';
import { buildReflection } from './buildReflection';
import { buildTemplateLiteral } from './buildTemplateLiteral';
import { buildTuple } from './buildTuple';
import { buildUnion } from './buildUnion';

export type TypeStringOptions = { nonNull?: boolean; commentExtractor?: string[] };
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
      case 'templateLiteral':
        return buildTemplateLiteral(typeString, type, options);
      case 'query':
        return typeString(type.queryType, options);
      case 'tuple':
        return buildTuple(typeString, type, options);
      case 'intersection':
        return buildIntersection(typeString, type, options);
      case 'union':
        return buildUnion(typeString, type, options);
      case 'namedTupleMember':
        return buildNamedTupleMember(typeString, type);
      case 'reflection':
        return buildReflection(typeString, type, options);
      case 'reference': {
        if (type.package !== 'typescript') customTypes?.push(type.name);
        return buildReference(typeString, type, options);
      }
    }
  };

  return typeString;
};

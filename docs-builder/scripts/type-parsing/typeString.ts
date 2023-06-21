import type { All_Types } from '../types';
import { buildArray } from './buildArray';
import { buildLiteral } from './buildLiteral';
import { buildPredicate } from './buildPredicate';
import { buildElement } from './buildProperty';
import { buildReference } from './buildReference';
import { buildReflection } from './buildReflection';
import { buildTuple } from './buildTuple';

export type TypeStringFunction = (type: All_Types) => string;

export const createTypeString = (functionName: string, customTypes?: string[]) => {
  const typeString: TypeStringFunction = (type) => {
    switch (type.type) {
      case 'tuple':
        return buildTuple(typeString, type);
      case 'namedTupleMember':
        return buildElement(typeString, type);
      case 'array':
        return buildArray(type);
      case 'predicate':
        return buildPredicate(type);
      case 'reflection':
        return buildReflection(typeString, type);
      case 'intrinsic':
        return type.name;
      case 'literal':
        return buildLiteral(type);
      case 'reference': {
        if (type.package !== 'typescript') customTypes?.push(type.name);
        return buildReference(typeString, type);
      }
      case 'intersection':
        return type.types.map(typeString).join(' & ');
      case 'union':
        return type.types.map(typeString).join(' | ');
    }
  };

  return typeString;
};

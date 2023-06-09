import { Type_Array } from '~/scripts/types';

export const buildArray = (type: Type_Array) => type.elementType.name + '[]';

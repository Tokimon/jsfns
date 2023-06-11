import { Type_Array } from '../types';

export const buildArray = (type: Type_Array) => type.elementType.name + '[]';

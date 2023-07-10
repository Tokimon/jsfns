import { type All_Types } from '../types';
import { type TypeStringFunction, type TypeStringOptions } from './typeString';

export const buildTypeCollection = (typeString: TypeStringFunction, types: All_Types[] = [], options?: TypeStringOptions) => {
  return types.map((type) => typeString(type, options)).filter((val) => !!val);
};

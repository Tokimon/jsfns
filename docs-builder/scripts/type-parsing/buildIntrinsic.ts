import { type Type_Intrinsic } from '../types';
import { type TypeStringOptions } from './typeString';

export function buildIntrinsic({ name }: Type_Intrinsic, options?: TypeStringOptions) {
  return options?.nonNull && name === 'undefined' ? '' : name;
}

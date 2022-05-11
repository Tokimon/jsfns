import type { GeneralWindow } from './types';



/**
 * Is the given object a Window object
 *
 * @param obj - The object to check
 * @returns Is it a Window object or not
 */
export default function isWindow(obj: unknown): obj is GeneralWindow {
  return !!obj && typeof (obj as GeneralWindow).self !== 'undefined';
}

/**
 * Returns the objects type definition name (eg. [object String] => "string")
 *
 * @param obj - Object to get the type of
 *
 * @returns Lower case string representation of the object type
 *
 * @example
 * ```ts
 * objectType('string'); // -> 'string'
 * objectType(123); // -> 'number'
 * objectType({}); // -> 'object'
 * ```
 */
export default function objectType(obj: unknown): string {
  const type = ({}).toString.call(obj);
  return type.substring(8, type.length - 1).toLowerCase();
}

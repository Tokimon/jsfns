/**
 * Returns the objects type definition name (eg. [object String] => "string")
 *
 * @example
 * ```ts
 * objectType('string'); // -> 'string'
 * objectType(123); // -> 'number'
 * objectType({}); // -> 'object'
 * ```
 *
 * @param obj - Object to get the type of
 * @return - Lower case string representation of the object type
 */
export default function objectType(obj) {
    const type = ({}).toString.call(obj);
    return type.substring(8, type.length - 1).toLowerCase();
}

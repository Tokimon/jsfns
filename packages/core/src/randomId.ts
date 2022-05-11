/**
 * Generate a random id of designated length
 *
 * @returns A random generated id
 *
 * @example
 * ```ts
 * randomId(); // -> eg. 'efuc6f1n4xf'
 * randomId(20); // -> eg. '3vsmrbxlh9at0vhcsf1xh'
 * ```
 */
export default function randomId(length = 10): string {
  let id = '';
  while (id.length < length) { id += Math.random().toString(36).substr(2); }
  return id.substr(0, length);
}

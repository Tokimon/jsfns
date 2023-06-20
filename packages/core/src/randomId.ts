/**
 * Generate a random id of designated length
 *
 * @param length - The desired length of the id (minimum 2)
 * @returns A random generated id of a specified length
 *
 * @example
 * ```ts
 * randomId(); // -> eg. 'efuc6f1n4xf'
 * randomId(20); // -> eg. '3vsmrbxlh9at0vhcsf1xh'
 * ```
 */
export function randomId(length = 10): string {
  length = Math.max(2, length);

  let id = '';
  while (id.length < length) id += Math.random().toString(36).slice(2);
  return id.slice(0, length);
}

export default randomId;

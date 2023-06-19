/**
 * Is the given object a Blob object
 *
 * @param obj - The object to check
 * @returns Is it a Blob object or not
 *
 * @example
 *
 * ```ts
 * isBlob(new Blob()) // --> true
 *
 * isBlob('blob') // --> false
 * ```
 */
export const isBlob = (obj: unknown): obj is Blob => obj instanceof Blob;

export default isBlob;

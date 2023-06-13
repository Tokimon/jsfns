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
export default function isBlob(obj: unknown): obj is Blob {
  return obj instanceof Blob;
}

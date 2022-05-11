/**
 * Is the given object a Blob object
 *
 * @param obj - The object to check
 * @returns Is it a Blob object or not
 */
export default function isBlob(obj: unknown): obj is Blob {
  return obj instanceof Blob;
}

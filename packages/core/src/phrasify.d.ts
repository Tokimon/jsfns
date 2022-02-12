export interface PhrasifySettings {
    numbers?: boolean;
}
/**
 * Transform a string into a space separated phrase
 *
 * @example
 * ```ts
 * phrasify('XMLDataInput'); // -> XML data input
 * phrasify('dataVALUE2-input', { numbers: true }); // -> data VALUE 2 input
 * ```
 *
 * @param input - The string to transform
 * @param settings - The settings for the transform
 * @return - The transformed phrase or word
 */
declare function phrasify(input: string, settings?: PhrasifySettings): string;
export default phrasify;

import { toWords } from './toWords.js';

/**
 * Transform a string into a space separated phrase
 *
 * @param input - The string to transform
 *
 * @returns The transformed phrase or word
 *
 * @example
 * ```ts
 * phrasify('XMLDataInput'); // --> XML data input
 * phrasify('99LuftBallons'); // --> 99 Luft Ballons
 * ```
 */
export function phrasify(input: string): string {
	return input ? toWords(input).join(' ') : '';
}

export default phrasify;

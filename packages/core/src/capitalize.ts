/**
 * Capitalize the first letter of each word in a phrase.
 *
 * Words are separated by whitespace or a dash (`-`), which are kept as they are. The rest of each
 * word is left untouched, so existing capitals (like in abbreviations) are not lowercased, and `_`
 * does not separate words. Letters from any language are supported.
 *
 * @param str - String to capitalize
 *
 * @returns The string with each word capitalized
 *
 * @example
 * ```ts
 * capitalize('capitalize this phrase'); // --> Capitalize This Phrase
 * capitalize('capitalize-This-phrase'); // --> Capitalize-This-Phrase
 * capitalize('with ABBR'); // --> With ABBR
 * capitalize('with_underscore'); // --> With_underscore
 * capitalize('école über-straße'); // --> École Über-Straße
 * ```
 */
export function capitalize(str: string): string {
	return str.replace(/(?<=^|[\s-])\p{L}/gu, (char) => char.toUpperCase());
}

export default capitalize;

/**
 * Capitalize each word in a phrase
 *
 * @param str - String to capitalize
 *
 * @returns Capitalized string
 *
 * @example
 * ```ts
 * capitalize('capitalize this phrase'); // --> Capitalize This Phrase
 * capitalize('capitalize-This-phrase'); // --> Capitalize-This-Phrase
 * ```
 */
export function capitalize(str: string): string {
	return str.replace(
		/(^|[\s-])(\w)/g,
		(_, ...[before, char]: string[]) => before + char.toUpperCase(),
	);
}

export default capitalize;

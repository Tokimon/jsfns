/**
 * Capitalize each word in a phrase
 *
 * @param str - String to capitalize
 *
 * @returns Capitalized string
 *
 * @example
 * ```ts
 * capitalize('capitalize this phrase'); // -> Capitalize This Phrase
 * capitalize('capitalize-This-phrase'); // -> Capitalize-This-Phrase
 * ```
 */
export const capitalize = (str: string): string => str.replace(
  /(^|[\s-])(\w)/g,
  (_, before, char) => before + char.toUpperCase()
);


export default capitalize;

/**
 * Capitalize each word in a phrase
 *
 * @example
 * ```ts
 * capitalize('capitalize this phrase'); // -> Capitalize This Phrase
 * capitalize('capitalize-This-phrase'); // -> Capitalize-This-Phrase
 * ```
 *
 * @param str - String to capitalize
 * @return - Capitalized string
 */
export default function capitalize(str: string): string {
  return str.replace(
    /(^|[\s-])(\w)/g,
    (_, before, char) => before + char.toUpperCase()
  );
}

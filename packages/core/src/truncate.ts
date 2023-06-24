import { isNumber } from './isNumber';

export type TruncateSettings = {
  /** Max length of the given string */
  maxLength?: number;
  /** What ending to give the truncated string (default is "...") */
  end?: string;
};

/**
 * Limits a string to a given number of characters and adds '...' in the end
 *
 * @param str - String to truncate
 * @param settings - Settings to use with the truncation
 *
 * @returns The truncated string
 *
 * @example
 * ```ts
 * truncate('No max length to the string'); // --> No max limit to the string length
 * truncate('With a max length to the string', { maxLength: 10 }); // --> With a max...
 * truncate('With a max length to the string and a different ending', { maxLength: 10, end: ' <---' }); // --> With a max <---
 * ```
 */
export function truncate(str: string, settings: TruncateSettings = {}): string {
  const { maxLength, end = '...' } = settings;

  if (!isNumber(maxLength) || maxLength < 0 || str.length <= maxLength) return str;

  return `${str.slice(0, maxLength)}${end}`;
}

export default truncate;

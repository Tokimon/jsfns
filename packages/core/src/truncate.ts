import isNumber from './isNumber';



interface TruncateSettings {
  maxLength?: number;
  end?: string;
}



/**
 * Limits a string to a given number of characters and adds '...' in the end
 *
 * @example
 * ```ts
 * truncate('No max length to the string'); // -> No max limit to the string length
 * truncate('With a max length to the string', { maxLength: 10 }); // -> With a max...
 * truncate('With a max length to the string and a differnet ending', { maxLength: 10, end: ' <---' }); // -> With a max <---
 * ```
 *
 * @param str - String to truncate
 * @param settings - Settings to use with the truncation
 * @return - The truncated string
 */
export default function truncate(str: string, settings: TruncateSettings = {}): string {
  const { maxLength, end = '...' } = settings;

  if (
    !isNumber(maxLength)
    || (maxLength as number) < 0
    || str.length <= (maxLength as number)
  ) {
    return str;
  }

  return `${str.substr(0, maxLength)}${end}`;
}

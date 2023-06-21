import selectorToHTML from './selectorToHTML';

/**
 * Parses a string to see if it is already HTML otherwise it assumes
 * is a selector and parses it to HTML
 *
 * @param htmlOrSelector - The string to parse
 *
 * @returns The HTML string
 *
 * @example
 *
 * ```ts
 * // String is already HTML so it is returned as is
 * ensureHTML('<div />');
 *
 * // String is a selector, to is is parsed before it is returned
 * ensureHTML('.my-div'); // -> <div class="my-div" />
 * ```
 */
export const ensureHTML = (htmlOrSelector: string): string =>
  htmlOrSelector.includes('<') ? htmlOrSelector : selectorToHTML(htmlOrSelector);

export default ensureHTML;

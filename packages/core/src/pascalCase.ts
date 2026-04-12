import { type CamelCaseSettings, camelCase } from './camelCase.js';

/** Settings for the pascal case method */
export type PascalCaseSettings = Omit<CamelCaseSettings, 'upper'>;

/**
 * Transform a string into a PascalCased word (eg. 'pascal case' -> 'PascalCase')
 *
 * @param input - The string to format
 * @param settings - The settings for the transform
 *
 * @returns The formatted string
 *
 * @example
 * ```ts
 * pascalCase('data-value2-input'); // --> DataValue2input
 * pascalCase('XML data input'); // --> XmlDataInput
 *
 * // Keep abbreviations
 * pascalCase('data-VALUE2-input', { abbr: true }); // --> DataVALUE2Input
 * ```
 */
export const pascalCase = (input: string, settings?: PascalCaseSettings): string =>
	camelCase(input, { ...settings, upper: true });

export default pascalCase;

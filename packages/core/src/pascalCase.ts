import camelCase, { CamelCaseSettings } from './camelCase';



export type PascalCaseSettings = Omit<CamelCaseSettings, 'upper'>;



/**
 * Transform a string into a PascalCased word (eg. 'pascal case' -> 'PascalCase')
 *
 * @example
 * ```ts
 * pascalCase('data-value2-input'); // -> DataValue2input
 * pascalCase('XML data input'); // -> XmlDataInput
 *
 * // With settings
 * const settings = { abbr: true, numbers: true };
 *
 * pascalCase('data-VALUE2-input', settings); // -> DataVALUE2Input
 * ```
 *
 * @param input - The string to format
 * @param settings - The settings for the transform
 * @return - The formatted string
 */
function pascalCase(input: string, settings?: PascalCaseSettings): string {
  return camelCase(input, { ...settings, upper: true });
}

export default pascalCase;

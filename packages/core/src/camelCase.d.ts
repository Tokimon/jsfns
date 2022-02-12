import { PhrasifySettings } from './phrasify';
export interface CamelCaseSettings extends PhrasifySettings {
    upper?: boolean;
    abbr?: boolean;
}
export declare type CamelCaseFunction = (str: string) => string;
export declare const defaultSettings: CamelCaseSettings;
/**
 * Transform a string into a camelCased word (eg. 'camel case' -> 'camelCase')
 *
 * @example
 * ```ts
 * camelCase('data-value2-input'); // -> dataValue2input
 * camelCase('XML data input'); // -> XmlDataInput
 *
 * // With settings
 * const settings = { abbr: true, numbers: true, upper: true };
 *
 * camelCase('data-VALUE2-input', settings); // -> DataVALUE2Input
 * ```
 *
 * @param input - The string to format
 * @param settings - The settings for the transform
 * @return - The formatted string
 */
declare function camelCase(input: string, settings?: CamelCaseSettings): string;
export default camelCase;

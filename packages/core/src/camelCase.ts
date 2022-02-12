import phrasify, { PhrasifySettings } from './phrasify';



export interface CamelCaseSettings extends PhrasifySettings {
  upper?: boolean;
  abbr?: boolean;
}

export type CamelCaseFunction = (str: string) => string;



export const defaultSettings: CamelCaseSettings = {
  upper: false,
  abbr: false,
  numbers: true
};



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
function camelCase(input: string, settings?: CamelCaseSettings): string {
  if (!input) { return ''; }

  const { upper, abbr, numbers } = Object.assign({}, defaultSettings, settings);

  return phrasify(input, { numbers })
    .replace(/(?:^|\s+)(\w+)/g, (_: string, word: string, index: number) => {
      if (index === 0 && !upper) {
        return abbr && word === word.toUpperCase()
          ? word
          : word.toLowerCase();
      }

      const restOfWord = word.substr(1);
      return word[0].toUpperCase() + (abbr ? restOfWord : restOfWord.toLowerCase());
    });
}

export default camelCase;

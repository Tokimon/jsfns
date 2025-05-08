import { type PhrasifySettings, phrasify } from './phrasify';

/** Settings for how to format the Camel Case */
export type CamelCaseSettings = PhrasifySettings & {
	/** Convert to UpperCase CamelCase (aka PascalCase) */
	upper?: boolean;
	/** Keep abbreviations uppercase (false == HTMLElement => HtmlElement | true == HTMLElement => HTMLElement) */
	abbr?: boolean;
};

export const defaultSettings: CamelCaseSettings = {
	upper: false,
	abbr: false,
	numbers: true,
};

/**
 * Transform a string into a camelCased word (eg. 'camel case' -> 'camelCase')
 *
 * @param input The string to format
 * @param settings The settings for the transform
 *
 * @returns The formatted string
 *
 * @example
 * ```ts
 * camelCase('data-value2-input'); // --> dataValue2input
 * camelCase('XML data input'); // --> XmlDataInput
 *
 * // With settings
 * const settings = { abbr: true, numbers: true, upper: true };
 *
 * camelCase('data-VALUE2-input', settings); // --> DataVALUE2Input
 * ```
 */
export function camelCase(input: string, settings?: CamelCaseSettings): string {
	if (!input) {
		return '';
	}

	const { upper, abbr, numbers } = { ...defaultSettings, ...settings };

	return phrasify(input, { numbers }).replace(
		/(?:^|\s+)(\w+)/g,
		(_: string, word: string, index: number) => {
			if (index === 0 && !upper) {
				return abbr && word === word.toUpperCase() ? word : word.toLowerCase();
			}

			const restOfWord = word.slice(1);
			return word[0].toUpperCase() + (abbr ? restOfWord : restOfWord.toLowerCase());
		},
	);
}

export default camelCase;

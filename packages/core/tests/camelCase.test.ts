import { type CamelCaseSettings, camelCase, defaultSettings } from '@jsfns/core/camelCase.js';
import { describe, expect, it } from 'vitest';
import { createBooleanSettings } from './assets/createBooleanSettings.js';
import { firstUpper } from './assets/firstUpper.js';
import { result, type TestInput } from './assets/result.js';

const emptyObj = {};
const settingsKeys = Object.keys(defaultSettings) as (keyof CamelCaseSettings)[];

const abbrev = (abbr?: boolean, inBeginning?: true) => {
	let str = 'ABBR';
	if (abbr) {
		return str;
	}

	str = str.toLowerCase();
	return inBeginning ? str : firstUpper(str);
};

const phrases: TestInput<CamelCaseSettings>[] = [
	['', ''],

	['Multiple   spaces   in  phrase', 'multipleSpacesInPhrase'],
	['/some/path/someWhere', 'somePathSomeWhere'],

	['With ABBR in the middle', ({ abbr }) => `with${abbrev(abbr)}InTheMiddle`],
	['ABBR in the beginning', ({ abbr }) => `${abbrev(abbr, true)}InTheBeginning`],
	['ABBRInWord', ({ abbr }) => `${abbrev(abbr, true)}InWord`],

	['Num42in the middle', 'num42InTheMiddle'],
	['42in the beginning', `42InTheBeginning`],
	['42 alone', '42Alone'],

	['camelCase', 'camelCase'],
	['PascalCase', 'pascalCase'],
	['snake_case', 'snakeCase'],
	['kebab-case', 'kebabCase'],

	['word', 'word'],
	['Name', 'name'],

	['data-ABBR42number space', ({ abbr }) => `data${abbrev(abbr)}42NumberSpace`],
	['Look! 99 ? ABBR #Test', ({ abbr }) => `look99${abbrev(abbr)}Test`],
];

describe('"camelCase"', () => {
	describe('Passing a string directly', () => {
		describe('Convert a phrase into a lower camelCased word (using default settings)', () => {
			it.each(phrases)('"%s"', (input, output) => {
				expect(camelCase(input)).toBe(result(output, defaultSettings));
			});
		});
	});

	describe('Passing a config object', () => {
		describe.each([
			emptyObj,
			...createBooleanSettings<CamelCaseSettings>(settingsKeys),
		] as CamelCaseSettings[])('%s', (conf) => {
			const settings = emptyObj === conf ? defaultSettings : conf;

			it.each(phrases)('"%s"', (input, output) => {
				let out = result(output, settings);
				if (conf.upper) {
					out = firstUpper(out);
				}

				expect(camelCase(input, settings)).toBe(out);
			});
		});
	});
});

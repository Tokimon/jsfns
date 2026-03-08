import { defaultSettings } from '@jsfns/core/camelCase';
import { type PascalCaseSettings, pascalCase } from '@jsfns/core/pascalCase';
import { createBooleanSettings } from './assets/createBooleanSettings';
import { firstUpper } from './assets/firstUpper';
import { result, type TestInput } from './assets/result';

const emptyObj = {};

const defaultPascalSettings: PascalCaseSettings = { abbr: true };
const settingsKeys = Object.keys(defaultPascalSettings) as (keyof PascalCaseSettings)[];

const abbrev = (abbr?: boolean) => {
	const str = 'ABBR';
	return abbr ? str : firstUpper(str.toLowerCase());
};

const phrases: TestInput<PascalCaseSettings>[] = [
	['', ''],

	['Multiple   spaces   in  phrase', 'MultipleSpacesInPhrase'],
	['/some/path/someWhere', 'SomePathSomeWhere'],

	['With ABBR in the middle', ({ abbr }) => `With${abbrev(abbr)}InTheMiddle`],
	['ABBR in the beginning', ({ abbr }) => `${abbrev(abbr)}InTheBeginning`],
	['ABBRInWord', ({ abbr }) => `${abbrev(abbr)}InWord`],

	['Num42in the middle', `Num42InTheMiddle`],
	['42in the beginning', `42InTheBeginning`],
	['42 alone', '42Alone'],

	['camelCase', 'CamelCase'],
	['PascalCase', 'PascalCase'],
	['snake_case', 'SnakeCase'],
	['kebab-case', 'KebabCase'],
	['-kebab-case-', 'KebabCase'],

	['word', 'Word'],
	['Name', 'Name'],

	[
		'data-ABBR42number space',
		({ abbr }) => `Data${abbrev(abbr)}42NumberSpace`,
	],
	['Look! 99 ? ABBR #Test', ({ abbr }) => `Look99${abbrev(abbr)}Test`],
];

describe('"pascalCase"', () => {
	describe('Passing a string directly', () => {
			it.each(phrases)('Converts "%s" into PascalCased word', (input, output) => {
				expect(pascalCase(input)).toBe(result(output, defaultSettings));
			});
	});

	describe('Passing a config object', () => {
		describe.each([
			emptyObj,
			...createBooleanSettings<PascalCaseSettings>(settingsKeys),
		] as PascalCaseSettings[])('%s', (conf) => {
			const settings = emptyObj === conf ? defaultPascalSettings : conf;

			it.each(phrases)('"%s"', (input, output) => {
				expect(pascalCase(input, settings)).toBe(result(output, settings));
			});
		});
	});
});

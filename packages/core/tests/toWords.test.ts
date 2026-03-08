import { toWords } from '@jsfns/core/toWords';

describe('"toWords"', () => {
	it.each([
		['Normal string', ['Normal', 'string']],
		['kebab-case', ['kebab', 'case']],
		['snake_case', ['snake', 'case']],
		['camelCase', ['camel', 'Case']],
		['HTMLElement', ['HTML', 'Element']],
		[
			'Some string with ABBR and 99 numbers',
			['Some', 'string', 'with', 'ABBR', 'and', '99', 'numbers'],
		],
		[
			'   MangledTMI77 - equals_some $AbStract....l8ter  ',
			['Mangled', 'TMI', '77', 'equals', 'some', 'Ab', 'Stract', 'l', '8', 'ter'],
		],
	])('Splits "%s" into words', (input, output) => {
		expect(toWords(input)).toStrictEqual(output);
	});
});

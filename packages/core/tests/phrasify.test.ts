import { phrasify } from '@jsfns/core/phrasify';
import { describe, expect, it } from 'vitest';
import { result } from './assets/result';

const phrases = [
	['', ''],

	['Multiple   spaces   in  phrase', 'Multiple spaces in phrase'],
	['/some/path/someWhere', 'some path some Where'],

	['ABBR in the beginning', 'ABBR in the beginning'],
	['ABBRInWord', 'ABBR In Word'],
	['Num42in the middle', 'Num 42 in the middle'],
	['42in the beginning', '42 in the beginning'],
	['42 alone', '42 alone'],

	['camelCase', 'camel Case'],
	['PascalCase', 'Pascal Case'],
	['snake_case', 'snake case'],
	['kebab-case', 'kebab case'],
	['-kebab-case-', 'kebab case'],

	['word', 'word'],
	['Name', 'Name'],

	['data-ABBR42number space', 'data ABBR 42 number space'],
	['Look! 99 ? ABBR #Test', 'Look 99 ABBR Test'],
];

describe('"phrasify"', () => {
	it.each(phrases)('Converts "%s" to a phrase', (input, output) => {
		expect(phrasify(input)).toBe(result(output));
	});
});

import { kebabCase } from '@jsfns/core/kebabCase';
import { describe, expect, it } from 'vitest';
import { result } from './assets/result';

const phrases = [
	['', ''],

	['Multiple   spaces   in  phrase', 'multiple-spaces-in-phrase'],
	['/some/path/someWhere', 'some-path-some-where'],

	['ABBR in the beginning', 'abbr-in-the-beginning'],
	['ABBRInWord', 'abbr-in-word'],
	['Num42in the middle', 'num-42-in-the-middle'],
	['42in the beginning', '42-in-the-beginning'],
	['42 alone', '42-alone'],

	['camelCase', 'camel-case'],
	['PascalCase', 'pascal-case'],
	['snake_case', 'snake-case'],
	['kebab-case', 'kebab-case'],

	['word', 'word'],
	['Name', 'name'],

	['data-ABBR42number space', 'data-abbr-42-number-space'],
	['Look! 99 ? ABBR #Test', 'look-99-abbr-test'],
] as const;

describe('"kebabCase"', () => {
	it.each(phrases)('Converts "%s" to kebab-case', (input, output) => {
		expect(kebabCase(input)).toBe(result(output));
	});
});

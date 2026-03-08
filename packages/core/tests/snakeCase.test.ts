import { snakeCase } from '@jsfns/core/snakeCase';
import { result, type TestInput } from './assets/result';

const phrases = [
	['', ''],

	['Multiple   spaces   in  phrase', 'multiple_spaces_in_phrase'],
	['/some/path/someWhere', 'some_path_some_where'],

	['ABBR in the beginning', 'abbr_in_the_beginning'],
	['ABBRInWord', 'abbr_in_word'],
	['Num42in the middle', `num_42_in_the_middle`],
	['42in the beginning', `42_in_the_beginning`],
	['42 alone', '42_alone'],

	['camelCase', 'camel_case'],
	['PascalCase', 'pascal_case'],
	['snake_case', 'snake_case'],
	['kebab-case', 'kebab_case'],

	['word', 'word'],
	['Name', 'name'],

	['data-ABBR42number space',`data_abbr_42_number_space`],
	['Look! 99 ? ABBR #Test', 'look_99_abbr_test'],
];

describe('"snakeCase"', () => {
			it.each(phrases)('Converts "%s" to snake_case', (input, output) => {
				expect(snakeCase(input)).toBe(result(output));
			});
});

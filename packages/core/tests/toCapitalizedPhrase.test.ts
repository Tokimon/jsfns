import { toCapitalizedPhrase } from '@jsfns/core/toCapitalizedPhrase.js';
import { describe, expect, it } from 'vitest';

describe('"toCapitalizedPhrase"', () => {
	it.each([
		['', ''],
		['word', 'Word'],
		['camelCase', 'Camel Case'],
		['PascalCase', 'Pascal Case'],
		['snake_case', 'Snake Case'],
		['kebab-case', 'Kebab Case'],
		['lower case phrase', 'Lower Case Phrase'],
		['some99words', 'Some 99 Words'],
		['HTMLElement', 'HTML Element'],
		['  -spaced--out_ ', 'Spaced Out'],
	])('Converts "%s" into "%s"', (input, output) => {
		expect(toCapitalizedPhrase(input)).toBe(output);
	});
});

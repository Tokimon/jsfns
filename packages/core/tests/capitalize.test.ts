import { capitalize } from '@jsfns/core/capitalize.js';
import { describe, expect, it } from 'vitest';

describe('"capitalize"', () => {
	it.each([
		['normal string', 'Normal String'],
		['with-dash', 'With-Dash'],
		['with_underscore', 'With_underscore'],
		['with ABBR', 'With ABBR'],
		['Already some Capitalized words', 'Already Some Capitalized Words'],
		['école über-straße', 'École Über-Straße'],
		['99 words', '99 Words'],
		["it's école", "It's École"],
		['straße über', 'Straße Über'],
	])('Returns string capitalized: "%s"', (input, output) => {
		expect(capitalize(input)).toBe(output);
	});
});

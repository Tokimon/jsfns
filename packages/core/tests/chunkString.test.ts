import { chunkString } from '@jsfns/core/chunkString';

describe('"chunkString"', () => {
	it('Cuts up a string into chunks', () => {
		const chunks = chunkString('abcdef');
		expect(chunks).toEqual(['ab', 'cd', 'ef']);
	});

	it('Returns empty Array for empty values', () => {
		expect(chunkString('')).toHaveLength(0);
	});

	describe('Options', () => {
		describe('{ size }', () => {
			it('Cuts up a string into chunks of given size', () => {
				const chunks = chunkString('abcdefghijkl', { size: 4 });
				expect(chunks).toEqual(['abcd', 'efgh', 'ijkl']);
			});

			it('When size is grater than the string length, entire string will be returned as only entry in the array', () => {
				const chunks = chunkString('abcdef', { size: 9 });
				expect(chunks).toEqual(['abcdef']);
			});

			it('When string length is not divisible by the size, last entry will contain the remaining of the string', () => {
				const chunks = chunkString('abcdefgh', { size: 3 });
				expect(chunks).toEqual(['abc', 'def', 'gh']);
			});
		});

		describe('{ reverse }', () => {
			it('First chunk will be the shortest', () => {
				const chunks = chunkString('abcdefg', { reverse: true });
				expect(chunks).toEqual(['a', 'bc', 'de', 'fg']);
			});
		});

		describe('{ size, reverse }', () => {
			it('Works together', () => {
				const chunks = chunkString('abcdefghijk', { reverse: true, size: 4 });
				expect(chunks).toEqual(['abc', 'defg', 'hijk']);
			});
		});
	});
});

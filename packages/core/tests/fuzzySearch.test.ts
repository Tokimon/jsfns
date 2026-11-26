import { type FuzzySearchOptions, fuzzySearch } from '@jsfns/core/fuzzySearch.js';
import { describe, expect, it } from 'vitest';

describe('"fuzzySearch"', () => {
	const input = 'javascript rocks';

	it.each([
		['javascript', true], // trailing input is free
		[input, true],
		['java', true],
		['javasxcript', true], // extra character
		['javacript', true], // missing character
		['javazcript', true], // wrong character
		['javaxyript', true], // 2 of 10 is within budget...
		['jaxxscrixt', false], // ...3 is not
		['kavascript', false], // the start must match exactly
		['jv', false],
		['script', false], // not at the start
		[`${input}s`, true], // 1 missing character at the end, within the budget of 3
	])(`"%s" in "${input}" === %s`, (search, assertion) => {
		expect(fuzzySearch(input, search)).toBe(assertion);
	});

	it('counts swapped neighbours as one edit', () => {
		// 9 characters: a budget of 1 edit
		expect(fuzzySearch('cartwheel', 'cartwehel')).toBe(true);
		expect(fuzzySearch('cartwheel', 'cartwehel', { maxDeviation: 0 })).toBe(false);
		expect(fuzzySearch('cartwheel', 'cartwhele')).toBe(true); // swap at the very end
		expect(fuzzySearch('cartwheel', 'cartwhxxl')).toBe(false); // two substitutions
		expect(fuzzySearch('cartwheel', 'cartehwel')).toBe(false); // not neighbours (`whe` -> `ehw`)
	});

	it('finds the best alignment, not the first', () => {
		expect(fuzzySearch('abxcd', 'abcd', { maxDeviation: 0.25 })).toBe(true);
		expect(fuzzySearch('abcd', 'abxcd', { maxDeviation: 0.2 })).toBe(true);
	});

	it('rejects an input too short, and has no leeway on short words', () => {
		expect(fuzzySearch('javasc', 'javascript')).toBe(false);
		expect(fuzzySearch('javascri', 'javascript')).toBe(true);
		expect(fuzzySearch('cat', 'cart')).toBe(false); // floor(4 * 0.2) = 0
	});

	it('matches an empty search', () => {
		expect(fuzzySearch(input, '')).toBe(true);
	});

	describe('Case insensitive by default', () => {
		it.each([
			['JAVASCRIPT', true],
			['jAvAsCrIpT', true],
		])(`"%s" in "${input}" === %s`, (search, assertion) => {
			expect(fuzzySearch(input, search)).toBe(assertion);
		});
	});

	describe('options', () => {
		it('caseSensitive', () => {
			expect(fuzzySearch('Cartwheel', 'cart', { caseSensitive: true })).toBe(false);
			expect(fuzzySearch('Cartwheel', 'Cart', { caseSensitive: true })).toBe(true);
		});

		it('maxDeviation', () => {
			expect(fuzzySearch(input, 'javascipt', { maxDeviation: 0 })).toBe(false);
			expect(fuzzySearch(input, 'javascript', { maxDeviation: 0 })).toBe(true);
			expect(fuzzySearch(input, 'jaxxscrixt', { maxDeviation: 0.3 })).toBe(true);
		});

		it('exactPrefixLength', () => {
			expect(fuzzySearch('cartwheel', 'cxrtwheel')).toBe(false);
			expect(fuzzySearch('cartwheel', 'cxrtwheel', { exactPrefixLength: 1 })).toBe(true);
			expect(fuzzySearch('cartwheel', 'xartwheel', { exactPrefixLength: 0 })).toBe(true);
		});

		it('exactSuffixLength keeps the last characters exact', () => {
			const opts = { exactSuffixLength: 2 };
			expect(fuzzySearch(input, 'javasxcript', opts)).toBe(true);
			expect(fuzzySearch(input, 'javascrixt', opts)).toBe(false);
			expect(fuzzySearch(input, 'javascrixt')).toBe(true);
			// A suffix longer than the word leaves no fuzzy part: everything after the prefix is exact
			expect(fuzzySearch('cartwheel', 'cartwehel', { exactSuffixLength: 99 })).toBe(false);
		});

		it('treats negative values as 0', () => {
			expect(fuzzySearch('cartwheel', 'xartwheel', { exactPrefixLength: -1 })).toBe(true);
			expect(fuzzySearch('cartwheel', 'cartwehel', { exactSuffixLength: -1 })).toBe(true);
			expect(fuzzySearch('cartwheel', 'cartwehel', { maxDeviation: -1 })).toBe(false);
		});
	});

	describe('edge cases', () => {
		it.each<[string, string, FuzzySearchOptions | undefined, boolean, string]>([
			// Empty strings
			['', '', undefined, true, 'both empty'],
			[input, '', undefined, true, 'empty search matches anything'],
			['', 'a', undefined, false, 'empty input, no budget'],
			['', 'abcde', undefined, false, 'empty input, budget of 1 is not enough'],
			['', 'a', { maxDeviation: 1 }, false, 'empty input, the exact prefix is the whole word'],
			[
				'',
				'a',
				{ maxDeviation: 1, exactPrefixLength: 0 },
				true,
				'empty input, search deleted completely',
			],
			// Lengths
			['abcd', 'abcde', undefined, true, 'input 1 shorter than the search, within budget'],
			['abc', 'abcde', undefined, false, 'input 2 shorter than the search, over budget'],
			['a', 'ab', undefined, false, 'input shorter than the exact prefix'],
			['ab', 'ab', undefined, true, 'exactly the prefix'],
			// Budget is floor(length * maxDeviation)
			['abcdefgh', 'abxdefgh', { maxDeviation: 0.125 }, true, 'floor(8 * 0.125) = 1'],
			['abcdefgh', 'abxdefgh', { maxDeviation: 0.124 }, false, 'floor(8 * 0.124) = 0'],
			['xyz', 'abc', { maxDeviation: 1, exactPrefixLength: 0 }, true, 'everything may deviate'],
			['xyz', 'abc', { maxDeviation: 1 }, false, 'but not the exact prefix'],
			// Swapped neighbours
			['cartwheel', 'catrwheel', undefined, true, 'swap at the start of the fuzzy part'],
			[
				'cartwheel',
				'cratwheel',
				undefined,
				false,
				'a swap across the exact prefix is not one edit',
			],
			['cartwheel', 'cratwheel', { exactPrefixLength: 1 }, true, 'unless the prefix is shorter'],
			['cartwheel', 'cartwehel', { exactSuffixLength: 2 }, true, 'swap right before the suffix'],
			[
				'cartwheel',
				'cartwheel'.replace('el', 'le'),
				{ exactSuffixLength: 2 },
				false,
				'swap inside the suffix',
			],
			// Exact prefix and suffix
			['cartwheel', 'cartwhxxl', { exactSuffixLength: 2 }, false, 'suffix cannot deviate'],
			[
				'cartwheel rolls',
				'cartwheel',
				{ exactSuffixLength: 99 },
				true,
				'whole word as suffix, found as is',
			],
			[
				'ab cd',
				'abxcd',
				{ maxDeviation: 0.2, exactSuffixLength: 2 },
				true,
				'suffix found after the fuzzy part',
			],
			// No regexp or locale surprises
			['a.b', 'a.b', undefined, true, 'special characters are literal'],
			['axb', 'a.b', { maxDeviation: 0 }, false, 'no wildcards'],
			['a*b', 'aab', { maxDeviation: 0 }, false, 'no quantifiers'],
		])('"%s" in "%s" %j === %s (%s)', (inp, search, options, assertion) => {
			expect(fuzzySearch(inp, search, options)).toBe(assertion);
		});

		it('is case sensitive for the exact parts and the fuzzy part', () => {
			const opts = { caseSensitive: true };
			expect(fuzzySearch('Javascript', 'javascipt', opts)).toBe(false); // the prefix differs
			expect(fuzzySearch('Javascript', 'Javascipt', opts)).toBe(true);
			expect(fuzzySearch('Javascript', 'JavaScript', opts)).toBe(true); // 1 wrong character
			expect(fuzzySearch('Javascript', 'JavaSCript', opts)).toBe(true); // 2 wrong characters, budget of 2
			expect(fuzzySearch('Javascript', 'JavaSCRipt', opts)).toBe(false); // 3 wrong characters
			expect(fuzzySearch('Javascript', 'JavaSCRipt')).toBe(true); // case insensitive
		});
	});

	describe('against a brute force reference', () => {
		/** Optimal string alignment: Levenshtein where swapping two neighbours is one edit. Full matrix. */
		const distance = (a: string, b: string) => {
			const d = Array.from({ length: a.length + 1 }, (_, i) =>
				Array.from({ length: b.length + 1 }, (_, j) => (i && j ? 0 : i || j)),
			);

			for (let i = 1; i <= a.length; i++) {
				for (let j = 1; j <= b.length; j++) {
					d[i][j] = Math.min(
						d[i - 1][j] + 1,
						d[i][j - 1] + 1,
						d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
					);

					if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
						d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
					}
				}
			}

			return d[a.length][b.length];
		};

		/** The definition with no shortcuts: the input starts with the prefix, then some start of the rest is within budget of the middle and followed by the suffix */
		const reference = (
			inp: string,
			word: string,
			prefixLen: number,
			suffixLen: number,
			maxEdits: number,
		) => {
			const middle = word.slice(prefixLen, word.length - suffixLen);
			const suffix = word.slice(word.length - suffixLen);
			const rest = inp.slice(prefixLen);

			return (
				inp.startsWith(word.slice(0, prefixLen)) &&
				Array.from({ length: rest.length + 1 }, (_, e) => e).some(
					(e) => distance(middle, rest.slice(0, e)) <= maxEdits && rest.startsWith(suffix, e),
				)
			);
		};

		/** Every string over the alphabet up to a length */
		const strings = (alphabet: string, maxLength: number) => {
			let layer = [''];
			const all = [''];
			for (let n = 0; n < maxLength; n++) {
				layer = layer.flatMap((s) => [...alphabet].map((c) => s + c));
				all.push(...layer);
			}
			return all;
		};

		it('agrees for every small input, search and option combination', () => {
			const words = [...new Set([...strings('ab', 4), ...strings('abc', 3)])];
			const inputs = [...new Set([...strings('ab', 5), ...strings('abc', 3)])];
			const mismatches: string[] = [];
			let matches = 0;

			for (const maxDeviation of [0.3, 0.6]) {
				for (const exactPrefixLength of [0, 1, 2]) {
					for (const exactSuffixLength of [0, 1, 2]) {
						for (const word of words) {
							const maxEdits = Math.floor(word.length * maxDeviation);
							const prefixLen = Math.min(exactPrefixLength, word.length);
							const suffixLen = Math.min(exactSuffixLength, word.length - prefixLen);

							for (const inp of inputs) {
								const expected = reference(inp, word, prefixLen, suffixLen, maxEdits);
								const actual = fuzzySearch(inp, word, {
									maxDeviation,
									exactPrefixLength,
									exactSuffixLength,
								});
								if (expected) matches++;
								if (actual !== expected) {
									mismatches.push(
										`"${inp}" ~ "${word}" ${JSON.stringify({ maxDeviation, exactPrefixLength, exactSuffixLength })}: expected ${expected}`,
									);
								}
							}
						}
					}
				}
			}

			expect(mismatches.slice(0, 10)).toEqual([]);
			expect(matches).toBeGreaterThan(500); // Make sure it is not only testing misses
		});
	});
});

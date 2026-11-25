import { toStrippedText } from '@jsfns/core/toStrippedText.js';
import { describe, expect, it } from 'vitest';

describe('"toStrippedText"', () => {
	it.each([
		// Accents
		['Crème Brûlée', 'Creme Brulee'],
		['ÀÉÎÕÜ çñ', 'AEIOU cn'],
		['e\u0301', 'e'], // an accent that is a separate character
		['İstanbul', 'Istanbul'], // dotted capital I
		['Ångström', 'Angstrom'],
		// Compatibility forms
		['ﬁne', 'fine'],
		['m² ①', 'm2 1'],
		['ＡＢＣ', 'ABC'], // full width
		// Whitespace
		['tab\tnew\nline\u00a0nbsp\u2003em', 'tab new line nbsp em'],
		['two  spaces', 'two  spaces'], // runs are kept
		// Quotes
		['L’Été', "L'Ete"],
		['‘a’ ‚b‘ ʼc', "'a' 'b' 'c"],
		['“a” „b“', '"a" "b"'],
		// Left alone
		['a\u0301\u0302b', 'ab'], // stacked accents
		['\u0301a', 'a'], // accent without a base letter
		['й ё ά', 'и е α'], // accents of other scripts too
		['ǆ ǅ', 'dz Dz'],
		['a\rb\vc\fd\u2028e\u3000f', 'a b c d e f'], // more whitespace
		['a\u200bb', 'a\u200bb'], // zero width space is not whitespace
		['a\x7fb\x1f', 'a\x7fb\x1f'], // control characters
		['Straße', 'Straße'], // no accent decomposition
		['Case Is Kept', 'Case Is Kept'],
		['plain text', 'plain text'],
		['It\'s "plain", 100% ~ (ASCII) [only]!', 'It\'s "plain", 100% ~ (ASCII) [only]!'],
		['plain\ttext\n', 'plain text '], // tabs and newlines are not on the fast path
		['日本語', '日本語'],
		['が', 'が'], // kana voicing marks are not accents
		['한국어', '한국어'], // Hangul is decomposed internally but recomposed
		['हिन्दी', 'हिन्दी'], // Indic vowel signs are letters
		['😀', '😀'],
		['', ''],
	])('Strips "%s" to "%s"', (text, stripped) => {
		expect(toStrippedText(text)).toBe(stripped);
	});

	it('holds for every single character', () => {
		const broken: string[] = [];

		for (let code = 0; code <= 0xffff; code++) {
			const char = String.fromCharCode(code);
			const stripped = toStrippedText(char);

			if (
				(code >= 0x20 && code <= 0x7e && stripped !== char) || // Plain ASCII is untouched
				toStrippedText(stripped) !== stripped || // Idempotent
				/[\u0300-\u036f]/.test(stripped) // No accents left
			) {
				broken.push(code.toString(16));
			}
		}

		expect(broken).toEqual([]);
	});
});

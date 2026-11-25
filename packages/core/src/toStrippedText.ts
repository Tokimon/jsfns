/**
 * Strip text down to a plain form, for accent insensitive matching (e.g. before a `fuzzySearch`).
 *
 * - Accents and diacritics are removed (`é` becomes `e`)
 * - Compatibility forms are replaced by their plain form (`ﬁ` becomes `fi`, `²` becomes `2`)
 * - Any whitespace becomes a space
 * - Typographic quotes become plain ones (`‘ ’ ‚ ʼ` become `'` and `“ ” „` become `"`)
 *
 * Case is kept, and the result can have a different length than the text. Letters without an
 * accent decomposition, like `ß`, are left as they are.
 *
 * @param text - The text to strip
 *
 * @returns The stripped text
 *
 * @example
 * ```ts
 * toStrippedText('L’Été'); // --> "L'Ete"
 * toStrippedText('Crème\tBrûlée'); // --> 'Creme Brulee'
 * toStrippedText('“ﬁne”'); // --> '"fine"'
 * ```
 */
export function toStrippedText(text: string): string {
	// Plain printable ASCII has nothing to strip
	if (/^[\x20-\x7e]*$/.test(text)) return text;

	return text
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '') // Combining accents. Other marks (kana, Hangul, Indic) are letters.
		.normalize('NFC') // Glue back what NFKD split but we kept (Hangul, kana), so those stay as written
		.replace(/\s/g, ' ')
		.replace(/[‘’‚ʼ]/g, "'")
		.replace(/[“”„]/g, '"');
}

export default toStrippedText;

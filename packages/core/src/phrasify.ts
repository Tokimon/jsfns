/** The settings for the phrasify function */
export type PhrasifySettings = {
	/** Make numbers the delimeter of a word or not */
	numbers?: boolean;
};

const defaultSettings: PhrasifySettings = { numbers: false };

/**
 * Transform a string into a space separated phrase
 *
 * @param input - The string to transform
 * @param settings - The settings for the transform
 *
 * @returns The transformed phrase or word
 *
 * @example
 * ```ts
 * phrasify('XMLDataInput'); // --> XML data input
 * phrasify('dataVALUE2-input', { numbers: true }); // --> data VALUE 2 input
 * ```
 */
export function phrasify(input: string, settings?: PhrasifySettings): string {
	if (!input) return '';

	const config = { ...defaultSettings, ...settings };

	// Create space before uppercase letters (if it is an abbreviation
	// - more than 1 letter - create space after as well)
	let inp = `${input}`.replace(/([A-Z])([a-z])/g, (m) => ` ${m}`);
	if (config.numbers) inp = inp.replace(/(\d+)/g, ' $1 ');

	// Convert any non letter/number characters into a single space
	// and remove trailing spaces
	return inp.replace(/[^a-z\d]+/gi, ' ').trim();
}

export default phrasify;

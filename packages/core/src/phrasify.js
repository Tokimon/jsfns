const defaultSettings = { numbers: false };
/**
 * Transform a string into a space separated phrase
 *
 * @example
 * ```ts
 * phrasify('XMLDataInput'); // -> XML data input
 * phrasify('dataVALUE2-input', { numbers: true }); // -> data VALUE 2 input
 * ```
 *
 * @param input - The string to transform
 * @param settings - The settings for the transform
 * @return - The transformed phrase or word
 */
function phrasify(input, settings) {
    if (!input) {
        return '';
    }
    settings = { ...defaultSettings, ...settings };
    // Create space before uppercase letters (if it is an abbrivaition
    // - more than 1 letter - create space after as well)
    input = `${input}`.replace(/([A-Z])([a-z])/g, (m) => ` ${m}`);
    if (settings.numbers) {
        input = input.replace(/(\d+)/g, ' $1 ');
    }
    // Convert any non letter/number characters into a single space
    // and remove trailing spaces
    return input.replace(/[^a-z\d]+/gi, ' ').trim();
}
export default phrasify;

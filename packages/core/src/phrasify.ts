export type PhrasifySettings = {
  numbers?: boolean;
}


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
 * phrasify('XMLDataInput'); // -> XML data input
 * phrasify('dataVALUE2-input', { numbers: true }); // -> data VALUE 2 input
 * ```
 */
function phrasify(input: string, settings?: PhrasifySettings): string {
  if (!input) { return ''; }

  settings = { ...defaultSettings, ...settings };

  // Create space before uppercase letters (if it is an abbrivaition
  // - more than 1 letter - create space after as well)
  input = `${input}`.replace(/([A-Z])([a-z])/g, (m) => ` ${m}`);
  if (settings.numbers) { input = input.replace(/(\d+)/g, ' $1 '); }

  // Convert any non letter/number characters into a single space
  // and remove trailing spaces
  return input.replace(/[^a-z\d]+/gi, ' ').trim();
}

export default phrasify;

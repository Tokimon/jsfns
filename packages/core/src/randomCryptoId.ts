/**
 * Generate a random id of designated length - using cryptographic secure random numbers,
 * so it is a bit slower than `randomId`
 *
 * @remarks
 *
 * This method differs from `crypto.randomUUID()` in the way that it can be of any specified length
 * and doesn't contain any "-".
 * The methods would be slightly slower than `randomId` since it is using `crypto.getRandomValues()`,
 * but it is a more secure method.
 *
 * @param length - The desired length of the id (minimum 2)
 * @returns A random generated id of a specified length
 *
 * @example
 *
 * ```ts
 * randomCryptoId(); // --> eg. 'efuc6f1n4xf'
 * randomCryptoId(20); // --> eg. '3vsmrbxlh9at0vhcsf1xh'
 * ```
 */
export function randomCryptoId(length = 10): string {
	const len = Math.max(2, length);

	// Cap the batch size so it never exceeds crypto.getRandomValues' length limit (16,384 Uint32 elements)
	const valuesLen = Math.min(Math.ceil(len / 6), 16_000);
	const UiArr = new Uint32Array(valuesLen);

	let id = '';
	while (id.length < len) {
		const numbers = globalThis.crypto.getRandomValues(UiArr);
		id += numbers.reduce((str, n) => str + n.toString(36), '');
	}

	return id.slice(0, len);
}

export default randomCryptoId;

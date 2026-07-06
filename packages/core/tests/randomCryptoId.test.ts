import crypto from 'node:crypto';
import { randomCryptoId } from '@jsfns/core/randomCryptoId.js';
import {
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	type MockInstance,
	vi,
} from 'vitest';

describe('"randomCryptoId"', () => {
	const hasCrypto = typeof globalThis.crypto !== 'undefined';

	beforeAll(() => {
		if (!hasCrypto) {
			Object.defineProperty(globalThis, 'crypto', {
				value: crypto,
			});
		}
	});

	it('Generates a random id of default length', () => {
		expect(randomCryptoId()).toMatch(/^[a-z0-9]{10}$/);
	});

	it('Generates a random id of specific length', () => {
		expect(randomCryptoId(100)).toMatch(/^[a-z0-9]{100}$/);
	});

	it('Always generate and id with a length of minimum 2', () => {
		expect(randomCryptoId(1)).toMatch(/^[a-z0-9]{2}$/);
		expect(randomCryptoId(0)).toMatch(/^[a-z0-9]{2}$/);
		expect(randomCryptoId(-100)).toMatch(/^[a-z0-9]{2}$/);
	});

	describe('Guarantees the requested length, even when the drawn numbers are small', () => {
		// The implementation sizes its Uint32Array assuming ~6 base-36 characters
		// per random number, but `n.toString(36)` is NOT fixed width (eg. the
		// number 5 becomes just '5', one character). When the drawn numbers are
		// small, the concatenated result must not come up short of the requested
		// length - measured to happen ~1.4% of the time for `randomCryptoId(6)`
		// with real randomness, so it's mocked here to make it deterministic
		// instead of relying on chance.
		let getRandomValuesSpy: MockInstance<typeof crypto.getRandomValues>;

		beforeEach(() => {
			getRandomValuesSpy = vi.spyOn(globalThis.crypto, 'getRandomValues').mockImplementation(
				// Every drawn number is small, so `n.toString(36)` is far shorter than assumed
				(arr) => (arr as Uint32Array<ArrayBuffer>).fill(5),
			);
		});

		afterEach(() => getRandomValuesSpy.mockRestore());

		it('Still returns an id of the requested length', () => {
			expect(randomCryptoId(6)).toHaveLength(6);
		});
	});

	it('Never requests more values in a single batch than crypto.getRandomValues allows', () => {
		// crypto.getRandomValues throws for arrays over 16,384 Uint32 elements, so a
		// length far beyond that (200_000 needs ~33,334 elements if drawn in one go)
		// forces the implementation to cap and loop over multiple smaller batches
		const spy = vi.spyOn(globalThis.crypto, 'getRandomValues');

		randomCryptoId(200_000);

		expect(spy.mock.calls.length).toBeGreaterThan(1);
		for (const [arr] of spy.mock.calls)
			expect((arr as Uint32Array).length).toBeLessThanOrEqual(16_000);

		spy.mockRestore();
	});
});

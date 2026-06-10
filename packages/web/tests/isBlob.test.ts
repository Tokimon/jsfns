import { isBlob } from '@jsfns/web/isBlob.js';
import { describe, expect, it } from 'vitest';
import { appendFrame, frameWindow } from './assets/helpers.js';

describe('"isBlob"', () => {
	it('Returns `true` for Blob objects', () => {
		expect(isBlob(new Blob())).toBe(true);
	});

	it('Returns `true` for a Blob from another realm (iframe)', () => {
		const frame = appendFrame();
		const crossRealmBlob = new (frameWindow(frame).Blob)();

		// Sanity check: a cross-realm Blob is NOT an instance of this realm's Blob
		expect(crossRealmBlob instanceof Blob).toBe(false);
		expect(isBlob(crossRealmBlob)).toBe(true);

		frame.remove();
	});

	it.each([null, {}, 123, 'blob'])('Returns `false` for non Blob objects', (val) => {
		expect(isBlob(val)).toBe(false);
	});
});

import { isDocComplete, onDomReady } from '@jsfns/web/onDomReady.js';
import { describe, expect, it, vi } from 'vitest';
import { bind, triggerEvent, unbind } from './assets/helpers.ts';

function afterDomLoad() {
	return new Promise((resolve) => {
		if (isDocComplete()) {
			resolve('complete');
		} else {
			const onRdyState = () => {
				if (isDocComplete()) {
					resolve('complete');
					unbind(document, 'readystatechange', onRdyState);
				}
			};

			bind(document, 'readystatechange', onRdyState);
		}
	});
}

describe('"onDomReady"', () => {
	it('Triggers the handler on the document ready event', async () => {
		await afterDomLoad();

		const onDomReadyCb = vi.fn();
		const fakeReadyState = vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');

		onDomReady(onDomReadyCb);
		fakeReadyState.mockRestore();

		triggerEvent('readystatechange');

		expect(onDomReadyCb).toHaveBeenCalled();
	});

	it('Triggers the handler when the method is bound after the DOM has finished loading', async () => {
		await afterDomLoad();
		const cb = vi.fn();
		onDomReady(cb);
		expect(cb).toHaveBeenCalled();
	});
});

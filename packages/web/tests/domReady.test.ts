import { docComplete, domReady } from '@jsfns/web/domReady.js';
import { describe, expect, it, vi } from 'vitest';
import { bind, triggerEvent, unbind } from './assets/helpers.js';

function afterDomLoad() {
	return new Promise((resolve) => {
		if (docComplete()) {
			resolve('complete');
		} else {
			const onRdyState = () => {
				if (docComplete()) {
					resolve('complete');
					unbind(document, 'readystatechange', onRdyState);
				}
			};

			bind(document, 'readystatechange', onRdyState);
		}
	});
}

describe('"domReady"', () => {
	it('Triggers the handler on the document ready event', async () => {
		await afterDomLoad();

		const domReadyCb = vi.fn();
		const fakeReadyState = vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');

		domReady(domReadyCb);
		fakeReadyState.mockRestore();

		triggerEvent('readystatechange');

		expect(domReadyCb).toHaveBeenCalled();
	});

	it('Triggers the handler when the method is bound after the DOM has finished loading', async () => {
		await afterDomLoad();
		const cb = vi.fn();
		domReady(cb);
		expect(cb).toHaveBeenCalled();
	});
});

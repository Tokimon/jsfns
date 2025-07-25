import { jest } from '@jest/globals';
import { docComplete, domReady } from '@jsfns/web/domReady';
import { bind, triggerEvent, unbind } from './assets/helpers';

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

		const domReadyCb = jest.fn();
		const fakeReadyState = jest.spyOn(document, 'readyState', 'get').mockReturnValue('loading');

		domReady(domReadyCb);
		fakeReadyState.mockRestore();

		triggerEvent('readystatechange');

		expect(domReadyCb).toHaveBeenCalled();
	});

	it('Triggers the handler when the method is bound after the DOM has finished loading', async () => {
		await afterDomLoad();
		const cb = jest.fn();
		domReady(cb);
		expect(cb).toHaveBeenCalled();
	});
});

import { off } from '@jsfns/web/off.js';
import { describe, expect, it, vi } from 'vitest';
import { appendFrame, bind, frameWindow, triggerEvent } from './assets/helpers.js';

describe('"off"', () => {
	function suite(elm?: HTMLElement | Window) {
		const eventName = 'test';
		const eventNames = [1, 2, 3].map((n) => eventName + n.toString());

		const _off = (...args: Parameters<typeof off>) => (elm ? off(elm, ...args) : off(...args));

		const target = elm || document;

		it.each(['', '_', '-', '.', ':'])('Removes event with separator: "%s"', (separator) => {
			const cb = vi.fn();
			const spy = vi.spyOn(target, 'removeEventListener');

			let e = eventName;
			if (separator) e += separator + 'part';

			_off(e, cb);

			expect(spy).toHaveBeenCalledTimes(1);

			spy.mockRestore();
		});

		it('Calls "removeEventListener" for each event name in a list', () => {
			const cb = vi.fn();
			const spy = vi.spyOn(target, 'removeEventListener');

			_off(eventNames, cb);

			expect(spy).toHaveBeenCalledTimes(3);
			const eventArguments = spy.mock.calls.map(([name]) => name);
			expect(eventNames).toEqual(eventArguments);

			spy.mockRestore();
		});

		it('Removes event', () => {
			const cb = vi.fn();

			bind(target, eventName, cb);
			triggerEvent(eventName, target);

			expect(cb).toHaveBeenCalledTimes(1);

			_off(eventName, cb);

			triggerEvent(eventName, target);

			expect(cb).toHaveBeenCalledTimes(1);
		});
	}

	describe.each([
		['no Element (falls back to Document)', undefined],
		['a HTML element', document.body],
		['Window', window],
	])('With %s', (_, elm) => {
		suite(elm);
	});

	describe('With a cross-realm iframe window (issue #24)', () => {
		it('Removes from the iframe contentWindow instead of falling back to document', () => {
			const eventName = 'test';
			const frame = appendFrame();
			const win = frameWindow(frame);
			const handler = vi.fn();

			const documentSpy = vi.spyOn(document, 'removeEventListener');
			const frameSpy = vi.spyOn(win, 'removeEventListener');

			bind(win, eventName, handler);

			off(win, eventName, handler);

			expect(frameSpy).toHaveBeenCalledWith(eventName, handler, undefined);
			expect(documentSpy).not.toHaveBeenCalled();

			win.dispatchEvent(new win.Event(eventName));
			expect(handler).not.toHaveBeenCalled();

			frameSpy.mockRestore();
			documentSpy.mockRestore();
			frame.remove();
		});
	});
});

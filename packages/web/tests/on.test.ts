import { type OnOptions, on } from '@jsfns/web/on.js';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { byId, generateId, insertHtml, triggerEvent } from './assets/helpers.js';

const testID = generateId('on');
const eventName = 'test';
const eventNames = [1, 2, 3].map((n) => eventName + n.toString());

describe('"on"', () => {
	function suite(elm: Document | HTMLElement | Window) {
		let testElm: HTMLElement;
		let targetChild: HTMLElement;

		beforeAll(() => {
			insertHtml(`
        <div id='${testID}'>
          <span class='child'></span>
        </div>
      `);

			testElm = byId(testID);
			targetChild = testElm.firstElementChild as HTMLElement;
		});

		it.each(['', '_', '-', '.', ':'])('Adds event with separator: "%s"', (separator) => {
			const cb = vi.fn();
			const spy = vi.spyOn(elm, 'addEventListener');

			let e = eventName;
			if (separator) e += separator + 'part';

			const off = on(elm, e, cb);

			expect(spy).toHaveBeenCalledTimes(1);

			off();
			spy.mockRestore();
		});

		it('Calls "addEventListener" for each event name in a list', () => {
			const cb = vi.fn();
			const spy = vi.spyOn(elm, 'addEventListener');

			const off = on(elm, eventNames, cb);

			expect(spy).toHaveBeenCalledTimes(eventNames.length);
			const eventArguments = spy.mock.calls.map(([name]) => name);
			expect(eventNames).toEqual(eventArguments);

			off();
			spy.mockRestore();
		});

		describe('Options', () => {
			describe('{ when }', () => {
				it('Only triggers event when the "when" method return "true"', () => {
					const cb = vi.fn();
					const when = vi.fn().mockReturnValue(false);

					const off = on(elm, eventName, cb, {
						when: when as OnOptions['when'],
					});

					triggerEvent(eventName, elm);
					triggerEvent(eventName, elm);
					when.mockReturnValue(true);
					triggerEvent(eventName, elm);
					when.mockReturnValue(false);
					triggerEvent(eventName, elm);
					triggerEvent(eventName, elm);

					expect(cb).toHaveBeenCalledTimes(1);

					off();
				});
			});

			describe('{ once }', () => {
				it('Triggers the event only once', () => {
					const cb = vi.fn();

					const off = on(elm, eventName, cb, { once: true });

					expect(cb).toHaveBeenCalledTimes(0);

					triggerEvent(eventName, elm);
					triggerEvent(eventName, elm);
					triggerEvent(eventName, elm);

					expect(cb).toHaveBeenCalledTimes(1);

					off();
				});
			});

			describe('{ delegate }', () => {
				it('Does not trigger the event, when target does not math delegation selector', () => {
					const cb = vi.fn();

					const off = on(elm, eventName, cb, { delegate: '#' + testID });

					triggerEvent(eventName, elm);

					expect(cb).toHaveBeenCalledTimes(0);

					off();
				});

				it('Triggers the event on the target that matches the given selector', () => {
					const cb = vi.fn();

					const off = on(elm, eventName, cb, { delegate: '#' + testID });

					expect(cb).toHaveBeenCalledTimes(0);

					triggerEvent(eventName, testElm);
					triggerEvent(eventName, targetChild);

					const expectedObj = expect.objectContaining({
						currentTarget: testElm,
					});

					expect(cb).toHaveBeenCalledTimes(2);
					expect(cb).toHaveBeenNthCalledWith(1, expectedObj);
					expect(cb).toHaveBeenNthCalledWith(2, expectedObj);

					off();
				});

				it('Calls the event handler with the delegation target as `this`', () => {
					const off = on(
						elm,
						eventName,
						function () {
							expect(this).toEqual(testElm);
						},
						{ delegate: '#' + testID },
					);

					triggerEvent(eventName, targetChild);

					off();
				});
			});

			describe('{ when, once }', () => {
				it('Triggers event only once when the "when" method return "true"', () => {
					const cb = vi.fn();
					const when = vi.fn();

					when.mockReturnValue(false);

					const off = on(elm, eventName, cb, {
						when: when as OnOptions['when'],
						once: true,
					});

					expect(cb).toHaveBeenCalledTimes(0);

					triggerEvent(eventName, elm);
					triggerEvent(eventName, elm);
					when.mockReturnValue(true);
					triggerEvent(eventName, elm); // <-- should be removed after this call
					triggerEvent(eventName, elm);
					triggerEvent(eventName, elm);

					expect(cb).toHaveBeenCalledTimes(1);

					off();
				});
			});

			describe('{ when, delegate }', () => {
				it('Triggers event on the matching target, only when the "when" method return "true"', () => {
					const cb = vi.fn();
					const when = vi.fn();

					when.mockReturnValue(false);

					const off = on(elm, eventName, cb, {
						delegate: '#' + testID,
						when: when as OnOptions['when'],
					});

					expect(cb).toHaveBeenCalledTimes(0);

					triggerEvent(eventName, targetChild);
					triggerEvent(eventName, targetChild);
					when.mockReturnValue(true);
					triggerEvent(eventName, targetChild);
					when.mockReturnValue(false);
					triggerEvent(eventName, targetChild);
					triggerEvent(eventName, targetChild);

					expect(cb).toHaveBeenCalledTimes(1);
					expect(cb).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: testElm }));

					off();
				});
			});

			describe('{ once, delegate }', () => {
				it('Triggers event on the matching target, only once', () => {
					const cb = vi.fn();

					const off = on(elm, eventName, cb, {
						delegate: '#' + testID,
						once: true,
					});

					expect(cb).toHaveBeenCalledTimes(0);

					triggerEvent(eventName, elm);

					expect(cb).toHaveBeenCalledTimes(0);

					triggerEvent(eventName, targetChild);
					triggerEvent(eventName, targetChild);

					expect(cb).toHaveBeenCalledTimes(1);
					expect(cb).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: testElm }));

					off();
				});
			});

			describe('{ when, once, delegate }', () => {
				it('Triggers event on the matching target, only once when the "when" method return "true"', () => {
					const cb = vi.fn();
					const when = vi.fn();

					const off = on(elm, eventName, cb, {
						delegate: '#' + testID,
						when: when as OnOptions['when'],
						once: true,
					});

					expect(cb).toHaveBeenCalledTimes(0);

					when.mockReturnValue(false);
					triggerEvent(eventName, elm);

					expect(cb).toHaveBeenCalledTimes(0);

					when.mockReturnValue(true);
					triggerEvent(eventName, elm);

					expect(cb).toHaveBeenCalledTimes(0);

					when.mockReturnValue(false);
					triggerEvent(eventName, testElm);

					expect(cb).toHaveBeenCalledTimes(0);

					when.mockReturnValue(true);

					triggerEvent(eventName, testElm);
					triggerEvent(eventName, targetChild);
					triggerEvent(eventName, targetChild);

					expect(cb).toHaveBeenCalledTimes(1);
					expect(cb).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: testElm }));

					off();
				});

				it('For multiple events', () => {
					const cb = vi.fn();

					const whens: Record<string, [boolean, EventListener]> = {
						[eventNames[0]]: [true, vi.fn()],
						[eventNames[1]]: [true, vi.fn()],
						[eventNames[2]]: [true, vi.fn()],
					};

					const multiWhen: OnOptions['when'] = (e) => whens[e.type][0];

					const off = on(elm, eventNames, (e) => whens[e.type][1](e), {
						delegate: '#' + testID,
						when: multiWhen,
						once: true,
					});

					expect(cb).toHaveBeenCalledTimes(0);

					for (const evt of eventNames) {
						triggerEvent(evt, elm);
						expect(whens[evt][1]).toHaveBeenCalledTimes(0);
					}

					for (const evt of eventNames) {
						whens[evt][0] = false;
						triggerEvent(evt, testElm);
						expect(whens[evt][1]).toHaveBeenCalledTimes(0);
					}

					whens[eventNames[0]][0] = true;
					triggerEvent(eventNames[0], testElm);
					triggerEvent(eventNames[0], targetChild);

					expect(whens[eventNames[0]][1]).toHaveBeenCalledTimes(1);
					expect(whens[eventNames[1]][1]).toHaveBeenCalledTimes(0);
					expect(whens[eventNames[2]][1]).toHaveBeenCalledTimes(0);

					whens[eventNames[1]][0] = true;
					triggerEvent(eventNames[1], testElm);
					triggerEvent(eventNames[1], targetChild);

					expect(whens[eventNames[0]][1]).toHaveBeenCalledTimes(1);
					expect(whens[eventNames[1]][1]).toHaveBeenCalledTimes(1);
					expect(whens[eventNames[2]][1]).toHaveBeenCalledTimes(0);

					whens[eventNames[2]][0] = true;
					triggerEvent(eventNames[2], testElm);
					triggerEvent(eventNames[2], targetChild);

					expect(whens[eventNames[0]][1]).toHaveBeenCalledTimes(1);
					expect(whens[eventNames[1]][1]).toHaveBeenCalledTimes(1);
					expect(whens[eventNames[2]][1]).toHaveBeenCalledTimes(1);

					off();
				});
			});
		});
	}

	describe('With document given', () => {
		it('Falls back to document, when no element is given', () => {
			const spy = vi.spyOn(document, 'addEventListener');
			const off = on(eventNames, vi.fn());

			expect(spy).toHaveBeenCalledTimes(eventNames.length);

			off();
			spy.mockRestore();
		});

		suite(document);
	});

	describe('With a given HTML element', () => {
		suite(document.body);
	});

	describe('With Window', () => {
		suite(window);
	});
});

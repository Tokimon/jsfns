import { MicroEvents } from '@jsfns/core/MicroEvents.js';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

type TestEvents = {
	greet: string;
	count: number;
	payload: { id: number; tags: string[] };
};

describe('"MicroEvents"', () => {
	describe('subscribe & trigger', () => {
		it('Calls the subscribed handler with the triggered data', () => {
			const events = new MicroEvents<TestEvents>();

			const handler = vi.fn();

			events.subscribe('greet', handler);
			events.trigger('greet', 'World');

			expect(handler).toHaveBeenCalledExactlyOnceWith('World');
		});

		it('Calls all handlers subscribed to the same event', () => {
			const events = new MicroEvents<TestEvents>();

			const handlerA = vi.fn();
			const handlerB = vi.fn();

			events.subscribe('greet', handlerA);
			events.subscribe('greet', handlerB);

			events.trigger('greet', 'World');

			expect(handlerA).toHaveBeenCalledExactlyOnceWith('World');
			expect(handlerB).toHaveBeenCalledExactlyOnceWith('World');
		});

		it('Only calls handlers subscribed to the triggered event', () => {
			const events = new MicroEvents<TestEvents>();

			const greetHandler = vi.fn();
			const countHandler = vi.fn();

			events.subscribe('greet', greetHandler);
			events.subscribe('count', countHandler);

			events.trigger('greet', 'World');

			expect(greetHandler).toHaveBeenCalledTimes(1);
			expect(countHandler).not.toHaveBeenCalled();
		});

		it('Does nothing when triggering an event with no subscribers', () => {
			const events = new MicroEvents<TestEvents>();

			expect(() => events.trigger('greet', 'World')).not.toThrow();
		});

		it('Subscribing the same handler reference twice only calls it once per trigger', () => {
			const events = new MicroEvents<TestEvents>();

			const handler = vi.fn();

			events.subscribe('greet', handler);
			events.subscribe('greet', handler);

			events.trigger('greet', 'World');

			expect(handler).toHaveBeenCalledTimes(1);
		});

		it('Calls handlers in the order they were subscribed', () => {
			const events = new MicroEvents<TestEvents>();

			const order: string[] = [];

			events.subscribe('greet', () => order.push('a'));
			events.subscribe('greet', () => order.push('b'));
			events.subscribe('greet', () => order.push('c'));

			events.trigger('greet', 'World');

			expect(order).toEqual(['a', 'b', 'c']);
		});

		it('Passes object/array data through by reference, without cloning', () => {
			const events = new MicroEvents<TestEvents>();

			const handler = vi.fn();
			const data = { id: 1, tags: ['a', 'b'] };

			events.subscribe('payload', handler);
			events.trigger('payload', data);

			expect(handler.mock.lastCall?.[0]).toBe(data);
		});

		it('Stops calling subsequent handlers when an earlier one throws', () => {
			const events = new MicroEvents<TestEvents>();

			const laterHandler = vi.fn();

			events.subscribe('greet', () => {
				throw new Error('boom');
			});
			events.subscribe('greet', laterHandler);

			expect(() => events.trigger('greet', 'World')).toThrow('boom');
			expect(laterHandler).not.toHaveBeenCalled();
		});

		it('Keeps subscriptions of separate instances independent', () => {
			const eventsA = new MicroEvents<TestEvents>();
			const eventsB = new MicroEvents<TestEvents>();

			const handler = vi.fn();

			eventsA.subscribe('greet', handler);

			eventsB.trigger('greet', 'World');

			expect(handler).not.toHaveBeenCalled();
		});

		describe('Mutating subscriptions during a trigger', () => {
			it('Calls a handler subscribed from inside another handler during the same trigger', () => {
				const events = new MicroEvents<TestEvents>();

				const lateHandler = vi.fn();
				const earlyHandler = vi.fn(() => {
					events.subscribe('greet', lateHandler);
				});

				events.subscribe('greet', earlyHandler);
				events.trigger('greet', 'World');

				expect(lateHandler).toHaveBeenCalledExactlyOnceWith('World');
			});

			it('Skips a not-yet-called handler that is unsubscribed from inside another handler', () => {
				const events = new MicroEvents<TestEvents>();

				const laterHandler = vi.fn();
				const earlyHandler = vi.fn(() => {
					events.unsubscribe('greet', laterHandler);
				});

				events.subscribe('greet', earlyHandler);
				events.subscribe('greet', laterHandler);
				events.trigger('greet', 'World');

				expect(laterHandler).not.toHaveBeenCalled();
			});

			it('Skips remaining handlers when `unsubscribeAll` clears the event from inside a handler', () => {
				const events = new MicroEvents<TestEvents>();

				const laterHandler = vi.fn();
				const earlyHandler = vi.fn(() => {
					events.unsubscribeAll('greet');
				});

				events.subscribe('greet', earlyHandler);
				events.subscribe('greet', laterHandler);
				events.trigger('greet', 'World');

				expect(laterHandler).not.toHaveBeenCalled();
			});
		});
	});

	describe('The function returned from `subscribe`', () => {
		it('Removes the handler when called', () => {
			const events = new MicroEvents<TestEvents>();

			const handler = vi.fn();

			const unsubscribe = events.subscribe('greet', handler);

			unsubscribe();
			events.trigger('greet', 'World');

			expect(handler).not.toHaveBeenCalled();
		});

		it('Does nothing when called more than once', () => {
			const events = new MicroEvents<TestEvents>();

			const unsubscribe = events.subscribe('greet', vi.fn());

			unsubscribe();

			expect(() => unsubscribe()).not.toThrow();
		});
	});

	describe('unsubscribe', () => {
		it('Removes a specific handler for the given event', () => {
			const events = new MicroEvents<TestEvents>();

			const handlerA = vi.fn();
			const handlerB = vi.fn();

			events.subscribe('greet', handlerA);
			events.subscribe('greet', handlerB);

			events.unsubscribe('greet', handlerA);
			events.trigger('greet', 'World');

			expect(handlerA).not.toHaveBeenCalled();
			expect(handlerB).toHaveBeenCalledExactlyOnceWith('World');
		});

		it('Does nothing when the handler was never subscribed', () => {
			const events = new MicroEvents<TestEvents>();

			expect(() => events.unsubscribe('greet', vi.fn())).not.toThrow();
		});

		describe('Cannot remove a `once`/`when`-wrapped subscription by its original handler reference', () => {
			it('once', () => {
				// `subscribe` stores an internal wrapper when `once`/`when` are used, not the
				// original function, so only the closure returned from `subscribe` can remove it.
				const events = new MicroEvents<TestEvents>();

				const handler = vi.fn();

				events.subscribe('greet', handler, { once: true });

				events.unsubscribe('greet', handler);
				events.trigger('greet', 'World');

				expect(handler).toHaveBeenCalledTimes(1);
			});

			it('when', () => {
				// `subscribe` stores an internal wrapper when `once`/`when` are used, not the
				// original function, so only the closure returned from `subscribe` can remove it.
				const events = new MicroEvents<TestEvents>();

				const handler = vi.fn();

				events.subscribe('greet', handler, { when: () => true });

				events.unsubscribe('greet', handler);
				events.trigger('greet', 'World');

				expect(handler).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe('unsubscribeAll', () => {
		it('Removes every handler for the given event', () => {
			const events = new MicroEvents<TestEvents>();

			const handlerA = vi.fn();
			const handlerB = vi.fn();

			events.subscribe('greet', handlerA);
			events.subscribe('greet', handlerB);

			events.unsubscribeAll('greet');
			events.trigger('greet', 'World');

			expect(handlerA).not.toHaveBeenCalled();
			expect(handlerB).not.toHaveBeenCalled();
		});

		it('Leaves other events untouched', () => {
			const events = new MicroEvents<TestEvents>();
			const greetHandler = vi.fn();
			const countHandler = vi.fn();
			events.subscribe('greet', greetHandler);
			events.subscribe('count', countHandler);

			events.unsubscribeAll('greet');
			events.trigger('count', 1);

			expect(countHandler).toHaveBeenCalledWith(1);
		});

		it('Does nothing when the event has no subscribers', () => {
			const events = new MicroEvents<TestEvents>();

			expect(() => events.unsubscribeAll('greet')).not.toThrow();
		});

		describe('Also removes `once`/`when`-wrapped subscriptions', () => {
			it('once', () => {
				// `subscribe` stores an internal wrapper when `once`/`when` are used, not the
				// original function, so only the closure returned from `subscribe` can remove it.
				const events = new MicroEvents<TestEvents>();

				const handler = vi.fn();

				events.subscribe('greet', handler, { once: true });

				events.unsubscribeAll('greet');
				events.trigger('greet', 'World');

				expect(handler).not.toHaveBeenCalled();
			});

			it('when', () => {
				// `subscribe` stores an internal wrapper when `once`/`when` are used, not the
				// original function, so only the closure returned from `subscribe` can remove it.
				const events = new MicroEvents<TestEvents>();

				const handler = vi.fn();

				events.subscribe('greet', handler, { when: () => true });

				events.unsubscribeAll('greet');
				events.trigger('greet', 'World');

				expect(handler).not.toHaveBeenCalled();
			});
		});
	});

	describe('Subscription options', () => {
		describe('{ once }', () => {
			it('Only calls the handler on the first trigger', () => {
				const events = new MicroEvents<TestEvents>();

				const handler = vi.fn();

				events.subscribe('greet', handler, { once: true });

				events.trigger('greet', 'World');
				events.trigger('greet', 'Again');

				expect(handler).toHaveBeenCalledExactlyOnceWith('World');
			});

			it('Passing `false` does nothing', () => {
				const events = new MicroEvents<TestEvents>();

				const handler = vi.fn();

				events.subscribe('greet', handler, { once: false });

				events.trigger('greet', 'World');
				events.trigger('greet', 'Again');

				expect(handler).toHaveBeenCalledTimes(2);
			});
		});

		describe('{ when }', () => {
			it('Only calls the handler when the predicate returns `true`', () => {
				const events = new MicroEvents<TestEvents>();

				const handler = vi.fn();

				events.subscribe('greet', handler, { when: (data) => data === 'World' });

				events.trigger('greet', 'Someone');
				events.trigger('greet', 'World');

				expect(handler).toHaveBeenCalledExactlyOnceWith('World');
			});

			it('Keeps the subscription active after the predicate returns `false`', () => {
				const events = new MicroEvents<TestEvents>();

				const handler = vi.fn();

				events.subscribe('greet', handler, { when: (data) => data === 'World' });

				events.trigger('greet', 'Someone');
				events.trigger('greet', 'World');
				events.trigger('greet', 'World');
				events.trigger('greet', 'Everyone');
				events.trigger('greet', 'World');

				expect(handler).toHaveBeenCalledTimes(3);
				expect(handler).toHaveBeenNthCalledWith(1, 'World');
				expect(handler).toHaveBeenNthCalledWith(2, 'World');
				expect(handler).toHaveBeenNthCalledWith(3, 'World');
			});
		});

		describe('{ once, when }', () => {
			it('Does not remove the handler on a trigger the predicate rejects', () => {
				const events = new MicroEvents<TestEvents>();

				const handler = vi.fn();

				events.subscribe('greet', handler, { once: true, when: (data) => data === 'World' });

				events.trigger('greet', 'Someone');

				expect(handler).not.toHaveBeenCalled();
			});

			it('Removes the handler only after the predicate first passes', () => {
				const events = new MicroEvents<TestEvents>();

				const handler = vi.fn();

				events.subscribe('greet', handler, { once: true, when: (data) => data === 'World' });

				events.trigger('greet', 'Someone');
				events.trigger('greet', 'World');
				events.trigger('greet', 'World');

				expect(handler).toHaveBeenCalledExactlyOnceWith('World');
			});
		});
	});

	describe('Typing', () => {
		it('Types the handler data parameter to the specific event', () => {
			const events = new MicroEvents<TestEvents>();

			events.subscribe('greet', (data) => {
				expectTypeOf(data).toEqualTypeOf<string>();
			});
		});

		it('Types the function returned from `subscribe` as a plain cleanup function', () => {
			const events = new MicroEvents<TestEvents>();

			expectTypeOf(events.subscribe('greet', () => {})).toEqualTypeOf<() => void>();
		});

		it('Rejects a handler whose data type does not match the event', () => {
			const events = new MicroEvents<TestEvents>();

			// @ts-expect-error `greet` carries a string, not a number
			events.subscribe('greet', (data: number) => data);
		});

		it('Rejects an event name that is not a key of `TEvents`', () => {
			const events = new MicroEvents<TestEvents>();

			// @ts-expect-error `unknown` is not a key of `TestEvents`
			events.subscribe('unknown', () => {});
		});

		it('Types the `when` predicate parameter to the specific event', () => {
			const events = new MicroEvents<TestEvents>();

			events.subscribe('greet', () => {}, {
				when: (data) => {
					expectTypeOf(data).toEqualTypeOf<string>();
					return true;
				},
			});
		});

		it('Rejects an event name in `unsubscribe` that is not a key of `TEvents`', () => {
			const events = new MicroEvents<TestEvents>();

			// @ts-expect-error `unknown` is not a key of `TestEvents`
			events.unsubscribe('unknown', () => {});
		});

		it('Rejects an event name in `unsubscribeAll` that is not a key of `TEvents`', () => {
			const events = new MicroEvents<TestEvents>();

			// @ts-expect-error `unknown` is not a key of `TestEvents`
			events.unsubscribeAll('unknown');
		});

		it('Rejects triggering an event with data of the wrong type', () => {
			const events = new MicroEvents<TestEvents>();

			// @ts-expect-error `count` expects a number, not a string
			events.trigger('count', 'nope');
		});
	});
});

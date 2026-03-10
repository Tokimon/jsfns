import { trigger } from '@jsfns/web/trigger';
import { describe, expect, it, vi } from 'vitest';
import { bind, unbind } from './assets/helpers';

describe('"Trigger"', () => {
	function suite(elm?: Element | Window) {
		const eventName = 'test';
		const eventNames = [1, 2, 3].map((n) => `${eventName}${n}`);

		const _trigger = (...args: [eventNames: string | string[], data?: unknown]) =>
			elm ? trigger(elm, ...args) : trigger(...args);

		const target = elm || document;

		it('Returns the given element', () => {
			expect(_trigger(eventName)).toBe(target);
		});

		it.each(['', '_', '-', '.', ':'])('Triggers event with separator: "%s"', (separator) => {
			const cb = vi.fn();

			let e = 'test';
			if (separator) {
				e += separator + 'part';
			}

			bind(target, e, cb);

			_trigger(e);

			expect(cb).toHaveBeenCalledTimes(1);

			unbind(target, e, cb);
		});

		it('Triggers multiple events', () => {
			const cb = vi.fn();

			for (const e of eventNames) bind(target, e, cb);

			_trigger(eventNames);

			expect(cb).toHaveBeenCalledTimes(3);

			for (const e of eventNames) unbind(target, e, cb);
		});

		it.each([
			['Object', { extra: 'test' }],
			['Function', () => undefined],
			['String', 'test'],
		])('Triggers given event with extra data: %s', (_, val) => {
			const cb = vi.fn();

			bind(target, eventName, cb);

			_trigger(eventName, val);

			expect(cb).toHaveBeenLastCalledWith(
				expect.objectContaining({
					detail: val,
				}),
			);

			unbind(target, 'test', cb);
		});
	}

	describe('With no Element given (falls back to Document)', () => {
		suite();
	});

	describe('With a given HTML element', () => {
		suite(document.body);
	});

	describe('With Window', () => {
		suite(window);
	});
});

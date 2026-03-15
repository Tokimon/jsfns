import { type DebounceCallback, type DebouncedFunction, debounce } from '@jsfns/core/debounce';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const TIME = 100;
const FULL_TIME = TIME + 1;
const HALF_TIME = Math.floor(TIME / 2);

describe('"Debounce"', () => {
	let orgfn: DebounceCallback;
	let dbfn: DebouncedFunction<DebounceCallback>;

	beforeEach(() => {
		vi.useFakeTimers();
		orgfn = vi.fn();
		dbfn = debounce(orgfn, TIME);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test('Function is called after the given number of milliseconds', () => {
		dbfn();
		expect(orgfn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(FULL_TIME);

		expect(orgfn).toHaveBeenCalled();
	});

	test('Function is called after 200 ms by default', () => {
		const dbnDefaultms = debounce(orgfn);
		dbnDefaultms();
		expect(orgfn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(201);

		expect(orgfn).toHaveBeenCalled();
	});

	test('Only the last function call is taken into account in the given timespan', () => {
		dbfn(1);
		dbfn(2);
		dbfn(3);

		expect(orgfn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(FULL_TIME);

		expect(orgfn).toHaveBeenCalledTimes(1);
		expect(orgfn).toHaveBeenCalledWith(3);
	});

	test('Function can be called again after the given timespan', () => {
		dbfn(1);

		vi.advanceTimersByTime(FULL_TIME);

		dbfn(2);

		vi.advanceTimersByTime(FULL_TIME);

		expect(orgfn).toHaveBeenCalledTimes(2);
		expect(orgfn).toHaveBeenNthCalledWith(1, 1);
		expect(orgfn).toHaveBeenNthCalledWith(2, 2);
	});

	test('When function is called again before the time has run out the time is reset', () => {
		dbfn(1);

		vi.advanceTimersByTime(HALF_TIME);

		dbfn(2);

		vi.advanceTimersByTime(HALF_TIME);

		expect(orgfn).toHaveBeenCalledTimes(0);

		vi.advanceTimersByTime(HALF_TIME + 1);

		expect(orgfn).toHaveBeenCalledTimes(1);
		expect(orgfn).toHaveBeenCalledWith(2);
	});

	test('Function is called with all given arguments', () => {
		dbfn(1, 2, 3, 4, 5, 6, 7, 8, 9);

		vi.advanceTimersByTime(FULL_TIME);

		expect(orgfn).toHaveBeenCalledWith(1, 2, 3, 4, 5, 6, 7, 8, 9);
	});

	describe('.cancelDebounce', () => {
		test('Cancels ongoing debounce (after a deley)', () => {
			dbfn(1);

			vi.advanceTimersByTime(HALF_TIME);

			dbfn.cancelDebounce();

			vi.advanceTimersByTime(FULL_TIME);

			expect(orgfn).not.toHaveBeenCalled();
		});

		test('Cancels ongoing debounce (straight away)', () => {
			dbfn(1);
			dbfn.cancelDebounce();

			vi.advanceTimersByTime(FULL_TIME);

			expect(orgfn).not.toHaveBeenCalled();
		});

		test('Does nothing when there is no ongoing debounce', () => {
			dbfn.cancelDebounce();
			dbfn(1);

			vi.advanceTimersByTime(FULL_TIME);

			expect(orgfn).toHaveBeenCalledTimes(1);
			expect(orgfn).toHaveBeenCalledWith(1);
		});
	});
});

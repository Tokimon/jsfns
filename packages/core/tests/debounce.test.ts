import { jest } from '@jest/globals';
import { type DebouncedFunction, debounce } from '@jsfns/core/debounce';
import { wait } from './assets/wait';

const TIME = 100;
const FULL_TIME = TIME + 1;
const HALF_TIME = Math.floor(TIME / 2);

describe('"Debounce"', () => {
	let orgfn: ReturnType<typeof jest.fn>;
	let dbfn: DebouncedFunction<typeof orgfn>;

	beforeEach(() => {
		orgfn = jest.fn();
		dbfn = debounce(orgfn, TIME);
	});

	test('Function is called after the given number of milliseconds', async () => {
		dbfn();
		expect(orgfn).not.toHaveBeenCalled();

		await wait(FULL_TIME);

		expect(orgfn).toHaveBeenCalled();
	});

	test('Function is called after 200 ms by default', async () => {
		const dbnDefaultms = debounce(orgfn);
		dbnDefaultms();
		expect(orgfn).not.toHaveBeenCalled();

		await wait(201);

		expect(orgfn).toHaveBeenCalled();
	});

	test('Only the last function call is taken into account in the given timespan', async () => {
		dbfn(1);
		dbfn(2);
		dbfn(3);

		expect(orgfn).not.toHaveBeenCalled();

		await wait(FULL_TIME);

		expect(orgfn).toHaveBeenCalledTimes(1);
		expect(orgfn).toHaveBeenCalledWith(3);
	});

	test('Function can be called again after the given timespan', async () => {
		dbfn(1);

		await wait(FULL_TIME);

		dbfn(2);

		await wait(FULL_TIME);

		expect(orgfn).toHaveBeenCalledTimes(2);
		expect(orgfn).toHaveBeenNthCalledWith(1, 1);
		expect(orgfn).toHaveBeenNthCalledWith(2, 2);
	});

	test('When function is called again before the time has run out the time is reset', async () => {
		dbfn(1);

		await wait(HALF_TIME);

		dbfn(2);

		await wait(HALF_TIME);

		expect(orgfn).toHaveBeenCalledTimes(0);

		await wait(HALF_TIME + 1);

		expect(orgfn).toHaveBeenCalledTimes(1);
		expect(orgfn).toHaveBeenCalledWith(2);
	});

	test('Function is called with all given arguments', async () => {
		dbfn(1, 2, 3, 4, 5, 6, 7, 8, 9);

		await wait(FULL_TIME);

		expect(orgfn).toHaveBeenCalledWith(1, 2, 3, 4, 5, 6, 7, 8, 9);
	});

	describe('.cancelDebounce', () => {
		test('Cancels ongoing debounce (after a deley)', async () => {
			dbfn(1);

			await wait(HALF_TIME);

			dbfn.cancelDebounce();

			await wait(FULL_TIME);

			expect(orgfn).not.toHaveBeenCalled();
		});

		test('Cancels ongoing debounce (straight away)', async () => {
			dbfn(1);
			dbfn.cancelDebounce();

			await wait(FULL_TIME);

			expect(orgfn).not.toHaveBeenCalled();
		});

		test('Does nothing when there is no ongoing debounce', async () => {
			dbfn.cancelDebounce();
			dbfn(1);

			await wait(FULL_TIME);

			expect(orgfn).toHaveBeenCalledTimes(1);
			expect(orgfn).toHaveBeenCalledWith(1);
		});
	});
});

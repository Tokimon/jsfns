import { jest } from '@jest/globals';
import { throttle } from '@jsfns/core/throttle';
import { wait } from './assets/wait';

const TIME = 100;
const FULL_TIME = TIME + 1;
const HALF_TIME = Math.floor(TIME / 2);

describe('"Throttle"', () => {
	let orgfn: ReturnType<typeof jest.fn>;
	let thfn: typeof orgfn;

	beforeEach(() => {
		orgfn = jest.fn();
		thfn = throttle(orgfn, TIME);
	});

	test('Triggers the given function', () => {
		thfn();
		expect(orgfn).toHaveBeenCalledTimes(1);
	});

	test('Triggers the given function with all given arguments', () => {
		thfn(1, 2, 3, 4, 5, 6, 7, 8, 9);
		expect(orgfn).toHaveBeenCalledWith(1, 2, 3, 4, 5, 6, 7, 8, 9);
	});

	test('Trigger only the first call within the given time limit', async () => {
		thfn(1);
		thfn(2);

		await wait(HALF_TIME);

		thfn(2);

		expect(orgfn).toHaveBeenCalledTimes(1);
		expect(orgfn).toHaveBeenCalledWith(1);
	});

	test('Triggers again after the given time limit', async () => {
		thfn(1);

		await wait(HALF_TIME);

		thfn(2);

		await wait(FULL_TIME);

		thfn(3);

		expect(orgfn).toHaveBeenCalledTimes(2);
		expect(orgfn).toHaveBeenNthCalledWith(1, 1);
		expect(orgfn).toHaveBeenNthCalledWith(2, 3);
	});

	test('Time limit is set to 200 ms per default', async () => {
		const thDefaultMs = throttle(orgfn);
		thDefaultMs(1);

		await wait(100);

		thDefaultMs(2);

		await wait(101);

		thDefaultMs(3);

		expect(orgfn).toHaveBeenCalledTimes(2);
		expect(orgfn).toHaveBeenNthCalledWith(1, 1);
		expect(orgfn).toHaveBeenNthCalledWith(2, 3);
	});
});

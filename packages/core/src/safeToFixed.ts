import { toSafeFractionDigits } from './toSafeFractionDigits.js';

/**
 * A `Number.prototype.toFixed` wrapper that never throws — the decimal count
 * is rounded and clamped to the 0-100 range `toFixed` accepts.
 *
 * @param num - Number to format
 * @param decimals - Number of decimals to fix the number to
 *
 * @returns The number formatted to a fixed number of decimals
 *
 * @example
 * ```ts
 * safeToFixed(1.2345, 2); // --> '1.23'
 * safeToFixed(1.2345, -2); // --> '1' (clamped to 0 decimals)
 * safeToFixed(1.2345, 150); // --> same as (1.2345).toFixed(100) (clamped to 100 decimals)
 * ```
 */
export function safeToFixed(num: number, decimals: number) {
	return num.toFixed(toSafeFractionDigits(decimals));
}

export default safeToFixed;

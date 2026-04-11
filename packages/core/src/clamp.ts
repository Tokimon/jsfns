/**
 * Clamp a number to a certain range defined by a minimum and a maximum
 *
 * @param min - Lower limit
 * @param value - The number to clamp
 * @param max - Upper limit
 *
 * @returns The number clamped to the min/max boundaries
 *
 * @example
 * ```ts
 * clamp(10, 5, 20); // --> 10
 * clamp(10, 15, 20); // --> 15
 * clamp(10, 25, 20); // --> 20
 * ```
 */
export const clamp = (min: number, value: number, max: number): number =>
	value < min ? min : value > max ? max : value;

export default clamp;

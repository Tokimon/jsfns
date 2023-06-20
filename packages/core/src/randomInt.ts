const random = (num: number): number => Math.round(Math.random() * num);

const range = (num: number, num2: number): number => {
  if (num2 < num) [num, num2] = [num2, num];
  return random(num2 - num) + num;
};

/**
 * Returns a random integer from a base number or range of numbers
 *
 * @param min - The minimum number to generate
 * @param max - The maximum number to generate
 *
 * @returns A random number between the given min and max
 *
 * @example
 * ```ts
 * randomInt(100, 200); // -> a number between 100 and 200
 * ```
 */
function randomInt(min: number, max: number): number;

/**
 * Returns a random integer from a base number or range of numbers
 *
 * @param max - The maximum number to generate
 *
 * @returns A random number between 0 and the given max
 *
 * @example
 * ```ts
 * // Any random number
 * randomInt(); // -> a number between 0 and Number.MAX_SAFE_INTEGER
 *
 * // With max number
 * randomInt(100); // -> a number between 0 and 100
 * ```
 */
function randomInt(max?: number): number;

function randomInt(num = Number.MAX_SAFE_INTEGER, num2?: number): number {
  return num2 === undefined ? random(num) : range(num, num2);
}

export { randomInt };
export default randomInt;

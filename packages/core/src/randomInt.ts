const random = (num: number): number => Math.round(Math.random() * num);

const range = (num: number, num2: number): number => {
  if (num2 < num) {
    [num, num2] = [num2, num];
  }

  return random(num2 - num) + num;
};



/**
 * Returns a random integer from a base number or range of numbers
 *
 * @example
 * ```ts
 * // Direct base number
 * randomInt(100); // -> a number between 0 and 100
 *
 * // A range of numbers
 * randomInt(100, 200); // -> a number between 100 and 200
 * ```
 *
 * @param num - The base number to generate the random number from
 * @param num2 - The second number in a range to create the number between
 */
export default function randomInt(num: number, num2?: number): number {
  return num2 === undefined
    ? random(num)
    : range(num, num2);
}

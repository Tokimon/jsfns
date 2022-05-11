import randomInt from './randomInt';



/**
 * Generate a random RGB color
 *
 * @returns An Array with random R G B values
 *
 * @example
 * ```ts
 * randomRGBColor(); // -> eg. [169, 100, 52]
 * ```
 */
export default function randomRGBColor(): [number, number, number] {
  return [randomInt(255), randomInt(255), randomInt(255)];
}

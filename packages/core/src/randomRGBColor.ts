import randomInt from './randomInt';



/**
 * Generate a random RGB color
 *
 * @example
 * ```ts
 * randomRGBColor(); // -> eg. [169, 100, 52]
 * ```
 *
 * @return - An Array with random R G B values
 */
export default function randomRGBColor(): [number, number, number] {
  return [randomInt(255), randomInt(255), randomInt(255)];
}

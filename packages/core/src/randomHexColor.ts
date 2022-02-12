import randomRGBColor from './randomRGBColor';
import RGBToHex from './RGBToHex';



/**
 * Generate a random HEX color
 *
 * @example
 * ```ts
 * randomHexColor(); // -> eg. #f42c71
 * ```
 *
 * @return - A random hex color
 */
export default function randomHexColor(): string {
  return RGBToHex(randomRGBColor());
}

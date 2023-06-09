import randomRGBColor from './randomRGBColor';
import RGBToHex from './RGBToHex';



/**
 * Generate a random HEX color
 *
 * @returns A random hex color
 *
 * @example
 * ```ts
 * randomHexColor(); // -> eg. #f42c71
 * ```
 */
export default function randomHexColor(): string {
  return RGBToHex(randomRGBColor());
}

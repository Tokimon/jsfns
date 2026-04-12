import { RGBToHex } from './RGBToHex.js';
import { randomRGBColor } from './randomRGBColor.js';

/**
 * Generate a random HEX color
 *
 * @returns A random hex color
 *
 * @example
 * ```ts
 * randomHexColor(); // --> eg. #f42c71
 * ```
 */
export const randomHexColor = (): string => RGBToHex(randomRGBColor());

export default randomHexColor;

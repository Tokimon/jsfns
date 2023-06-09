import minMax from './minMax';
import hex from './numberToHex';



export type RGBTuple = [red: number, green: number, blue: number, alpha?: number];



const hexStr = (color: number) => hex(minMax(color, 0, 255));



/**
 * Converts an Array of R G B (A) colors into a hex color.
 *
 * @param rgb - The R G B (A) color represented as an array
 *
 * @returns A Hex representation of the given color
 *
 * @example
 * ```ts
 * RGBToHex([123, 123, 123]) // -> #7b7b7b
 *
 * // With alpha channel
 * RGBToHex([123, 123, 123, 0.5]) // -> #7b7b7b80
 * ```
 */
function RGBToHex(rgb: RGBTuple): string;

/**
 * Converts R G B (A) color arguments into a hex color.
 *
 * @param r - Red color
 * @param g - Green color
 * @param b - Blue color
 * @param a - Alpha channel
 *
 * @returns A Hex representation of the given colors
 *
 * @example
 * ```ts
 * // RGB as arguments
 * RGBToHex( 123, 123, 123 ) // -> #7b7b7b80
 *
 * // With alpha channel
 * RGBToHex( 123, 123, 123, 0.5 ) // -> #7b7b7b80
 * ```
 */
function RGBToHex(r: number, g: number, b: number, a?: number): string;

function RGBToHex(r: number | RGBTuple, g?: number, b?: number, a?: number): string {
  if (Array.isArray(r)) [r, g, b, a] = r;

  let hex = '#' + hexStr(r) + hexStr(g as number) + hexStr(b as number);
  if (a !== undefined) hex += hexStr(minMax(a, 0, 1) * 255);

  return hex;
}

export default RGBToHex;

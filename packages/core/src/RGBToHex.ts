import minMax from './minMax';
import hex from './numberToHex';



type RGBArray = [number, number, number] | [number, number, number, number];



const hexStr = (color: number) => hex(minMax(color, 0, 255));



/**
 * Converts a Array of R G B (A) colors into a hex color.
 *
 * @example
 * ```ts
 * RGBToHex([123, 123, 123]) // -> #7b7b7b
 *
 * // With alpha channel
 * RGBToHex([123, 123, 123, 0.5]) // -> #7b7b7b80
 * ```
 *
 * @param rgb - The R G B (A) color represented as an array
 * @return - A Hex representation of the given color
 */
function RGBToHex(rgb: RGBArray): string;

/**
 * Converts R G B (A) color arguments into a hex color.
 *
 * @example
 * ```ts
 * // RGB as arguments
 * RGBToHex( 123, 123, 123 ) // -> #7b7b7b80
 *
 * // With alpha channel
 * RGBToHex( 123, 123, 123, 0.5 ) // -> #7b7b7b80
 * ```
 *
 * @param r - Red color
 * @param g - Green color
 * @param b - Blue color
 * @param a - Alpha channel
 * @return - A Hex representation of the given colors
 */
function RGBToHex(r: number, g: number, b: number, a?: number): string;

function RGBToHex(r: number | RGBArray, g?: number, b?: number, a?: number): string {
  if (Array.isArray(r)) {
    [r, g, b, a] = r;
  }

  let hex = '#'
    + hexStr(r)
    + hexStr(g as number)
    + hexStr(b as number);

  if (a !== undefined && a < 1) {
    if (a < 0) { a = 0; }
    hex += hexStr(a * 255);
  }

  return hex;
}

export default RGBToHex;

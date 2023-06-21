import chunkString from './chunkString';
import hexToNumber from './hexToNumber';
import isString from './isString';

/**
 * Converts a Hexadecimal color to a RGB(A) color array
 *
 * @param hex - Hex color to convert to RGB
 *
 * @returns Array with RGB values
 *
 * @example
 * ```ts
 * hexToRGB('#2fd466'); // -> [47, 212, 102]
 *
 * // And with alpha channel
 * hexToRGB('#2fd46680'); // -> [47, 212, 102, 0.5]
 * ```
 */
export function hexToRGB(hex: string): number[] {
  if (!isString(hex) || !hex) return [0, 0, 0];

  if (hex[0] === '#') hex = hex.slice(1);

  const rgb = chunkString(hex, hex.length <= 4 ? 1 : 2).map((c) => hexToNumber(c.length > 1 ? c : `${c}${c}`));

  if (rgb.length > 3) rgb[3] = parseFloat((rgb[3] / 255).toFixed(2));

  return rgb;
}

export default hexToRGB;

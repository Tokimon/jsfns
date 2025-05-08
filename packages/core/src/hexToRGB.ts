import { chunkString } from './chunkString';
import { hexToNumber } from './hexToNumber';
import { isString } from './isString';

/**
 * Converts a Hexadecimal color to a RGB(A) color array
 *
 * @param hex - Hex color to convert to RGB
 *
 * @returns Array with RGB values
 *
 * @example
 * ```ts
 * hexToRGB('#fff'); // --> [255, 255, 255]
 * hexToRGB('#2fd466'); // --> [47, 212, 102]
 *
 * // And with alpha channel
 * hexToRGB('#2fd46680'); // --> [47, 212, 102, 0.5]
 * ```
 */
export function hexToRGB(hex: string): number[] {
	if (!isString(hex) || !hex) return [0, 0, 0];

	const color = hex[0] === '#' ? hex.slice(1) : hex;
	const rgb = chunkString(color, { size: color.length <= 4 ? 1 : 2 }).map((c) =>
		hexToNumber(c.length > 1 ? c : `${c}${c}`),
	);

	if (rgb.length > 3) rgb[3] = Number.parseFloat((rgb[3] / 255).toFixed(2));

	return rgb;
}

export default hexToRGB;

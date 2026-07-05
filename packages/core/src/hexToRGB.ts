import { chunkString } from './chunkString.js';
import { hexToNumber } from './hexToNumber.js';
import { isNumber } from './isNumber.js';
import type { RGBTuple } from './RGBToHex.js';

/**
 * Converts a Hexadecimal color to a RGB(A) color array
 *
 * @param hex - Hex color to convert to RGB
 *
 * @returns Array with RGB values or `null` if parsing fails
 *
 * @example
 * ```ts
 * hexToRGB('#fff'); // --> [255, 255, 255]
 * hexToRGB('#2fd466'); // --> [47, 212, 102]
 *
 * // Null on failed values
 * hexToRGB('#ab'); // --> null
 * hexToRGB(''); // --> null
 *
 * // And with alpha channel
 * hexToRGB('#2fd46680'); // --> [47, 212, 102, 0.5]
 * ```
 */
export function hexToRGB(hex: string): RGBTuple | null {
	const trimmed = hex.trim();
	const color = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed;

	if (color.length < 3) return null;

	const chunkSize = color.length <= 4 ? 1 : 2;
	const [r, g, b, a] = chunkString(color, { size: chunkSize }).map((c) =>
		hexToNumber(c.padStart(2, c)),
	);

	if (!isNumber(r) || !isNumber(g) || !isNumber(b)) return null;

	return !isNumber(a) ? [r, g, b] : [r, g, b, Number.parseFloat((a / 255).toFixed(2))];
}

export default hexToRGB;

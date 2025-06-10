/**
 * Represents the size (in pixels) for the sides of an elements box model (top, left, bottom, right).
 */
export type BoxModelSectionMapping = {
  /** The size (in pixels) of the top side. */
  top: number;

  /** The size (in pixels) of the left side. */
  left: number;

  /** The size (in pixels) of the bottom side. */
  bottom: number;

  /** The size (in pixels) of the right side. */
  right: number;
};

/**
 * Represents the box model values for an element, including margin, padding, and border widths.
 */
export type BoxModelMapping = {
  /** The element’s margin sizes (top, left, bottom, right). */
  margin: BoxModelSectionMapping;

  /** The element’s padding sizes (top, left, bottom, right). */
  padding: BoxModelSectionMapping;

  /** The element’s border widths (top, left, bottom, right). */
  border: BoxModelSectionMapping;
};

const num = (n: string) => Number.parseInt(n, 10);

/**
 * Parses the box model numbers of an given Element (margin, padding and border widths)
 *
 * @param elm - The element to parse numbers from
 * @returns The mapping of the box model
 *
 * @example
 *
 * ```ts
 * boxModel(someDiv);
 * ```
 */
export function boxModel(elm: Element): BoxModelMapping {
  const style = window.getComputedStyle(elm);

  return {
    margin: {
      top: num(style.marginTop),
      left: num(style.marginLeft),
      bottom: num(style.marginBottom),
      right: num(style.marginRight),
    },

    padding: {
      top: num(style.paddingTop),
      left: num(style.paddingLeft),
      bottom: num(style.paddingBottom),
      right: num(style.paddingRight),
    },

    border: {
      top: num(style.borderTopWidth),
      left: num(style.borderLeftWidth),
      bottom: num(style.borderBottomWidth),
      right: num(style.borderRightWidth),
    },
  };
}

export default boxModel;

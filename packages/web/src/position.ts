export type Position = {
  /** Number of pixels from the top */
  top: number;
  /** Number of pixels from the left */
  left: number;
  /** Number of pixels from the left to the right side of the element */
  right: number;
  /** Number of pixels from the top to the bottom side of the element */
  bottom: number;
};

export interface PositionData extends Position {
  /** Position relative to the offset parent */
  relative?: Position;
}

function absolutePosition(elm: HTMLElement | null, attr: 'offsetTop' | 'offsetLeft', accumulatedPosition = 0): number {
  if (!elm) return accumulatedPosition;
  return absolutePosition(elm.offsetParent as HTMLElement, attr, accumulatedPosition + elm[attr]);
}

const createPosition = (elm: HTMLElement, top?: number, left?: number): Position => {
  const t = top ?? elm.offsetTop;
  const l = left ?? elm.offsetLeft;
  return { top: t, left: l, right: l + elm.offsetWidth, bottom: t + elm.offsetHeight };
};

/**
 * Get the current absolute position of a DOM element and optionally also the relative position (position relative to offset parent)
 *
 * @param elm - The DOM element to find the position of
 * @returns the position information of the element
 *
 * @example
 *
 * ```ts
 * // Returns a 0 position
 * position(null);
 *
 * // Basically returns the size of the element, as top and left will be 0
 * position(document.documentElement);
 * position(document.body);
 *
 * // Get the position of a given element
 * position(MyElm);
 * ```
 */
export function position(elm: HTMLElement | null): PositionData {
  if (!elm) return { top: 0, left: 0, right: 0, bottom: 0 };

  const absTop = absolutePosition(elm, 'offsetTop');
  const absLeft = absolutePosition(elm, 'offsetLeft');

  return { ...createPosition(elm, absTop, absLeft), relative: createPosition(elm) };
}

export default position;

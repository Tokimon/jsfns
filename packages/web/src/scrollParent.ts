import isDOMChildNode from './isDOMChildNode';
import viewport from './viewport';



/**
 * Get the parent element that has scrolling
 *
 * @param elm - The element whose scroll parent is determined
 * @returns The scroll parent or the viewport
 *
 * @example
 *
 * ```ts
 * scrollParent(document.body) // --> `<html>`
 *
 * // <div style="overflow:auto"><p id="P" /></div>
 * scrollParent(document.getElementById('P')) // --> `<div>`
 *
 * // <div style="overflow:auto"><p id="P" style="position: fixed" /></div>
 * scrollParent(document.getElementById('P')) // --> `<html>`
 *
 * // <div style="overflow:auto"><p id="P" style="position: absolute" /></div>
 * scrollParent(document.getElementById('P')) // --> `<html>`
 *
 * // <div style="overflow:auto; position: relative"><p id="P" style="position: absolute" /></div>
 * scrollParent(document.getElementById('P')) // --> `<div>`
 * ```
 */
export function scrollParent(elm: Element): Element | HTMLElement | null {
  const vp = viewport(elm);

  if (!isDOMChildNode(elm) || elm === vp) return vp;

  const { position } = getComputedStyle(elm);

  if (position === 'fixed') return vp;

  const noStaticParent = position === 'absolute';
  let parent: HTMLElement | null = elm.parentElement;

  while (parent && parent !== document.body) {
    const { position, overflow, overflowX, overflowY } = getComputedStyle(parent);

    if (
      !(noStaticParent && position === 'static')
      && /(auto|scroll)/.test(overflow + overflowY + overflowX)
    ) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return vp;
}

export default scrollParent;

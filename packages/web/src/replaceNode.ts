import isString from '@js-fns/core/isString';

import isDOMChildNode from './isDOMChildNode';
import create from './create';



/**
 * Replace a given DOM element with another DOM element or plain HTML string
 *
 * @param elm - DOM element to replace
 * @param replacement - DOM element or plain HTML string to replace {elm}
 * @returns The value given in `elm`
 *
 * @example
 *
 * ```ts
 * // <div><span id='a' /></div>
 * replaceNode(document.getElementById('a'), document.createElement('p')) // --> <div><p /></div>
 * replaceNode(document.getElementById('a'), 'p.p') // --> <div><p class="p" /></div>
 * ```
 */
export function replaceNode(elm: Node, replacement?: Node | string): Node | void {
  if (!isDOMChildNode(elm)) return;
  if (!replacement) return elm.remove();

  if (isString(replacement)) replacement = create(replacement);

  elm.replaceWith(replacement);
  return elm;
}

export default replaceNode;

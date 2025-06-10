import { isHTMLElement } from "./isHTMLElement";

export interface HTMLChildElement extends HTMLElement {
  offsetParent: NonNullable<HTMLElement["offsetParent"]>;
  parentElement: NonNullable<HTMLElement["parentElement"]>;
  parentNode: NonNullable<HTMLElement["parentNode"]>;
}

/** A HTML Element with DOM element parent */
export type HTMLChildElement = Omit<
  HTMLElement,
  HTMLChildElementParentProps
> & {
  [K in HTMLChildElementParentProps]: NonNullable<HTMLElement[K]>;
};

/**
 * Is the given object a HTML element child of a DOM element
 *
 * @param node - The object to check
 * @returns Is it a child HTMLElement or not
 *
 * @example
 *
 * ```ts
 * isHTMLChildElement(document.body) // --> true
 * isHTMLChildElement(document.getElementById('my-elm')) // --> true
 * isHTMLChildElement(createDetachedDocument().body) // --> true
 *
 * isHTMLChildElement(document.documentElement) // --> false
 * ```
 */
export const isHTMLChildElement = (node: unknown): node is HTMLChildElement =>
  isHTMLElement(node) && node.offsetParent != null;

export default isHTMLChildElement;

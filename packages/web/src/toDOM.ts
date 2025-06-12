/**
 * Convert HTML into DOM node(s)
 *
 * @param html - HTML string to transform into nodes
 * @returns DOM elements that the HTML represented
 *
 * @remarks
 *
 * To keep the method simple and short, this method uses the `<template />`
 * element to convert the HTML. For older browsers, either
 * use a polyfill like `@webcomponents/template` or a more elaborate HTML parser
 * (like `parsehtml` or `html-parser`)
 *
 * @example
 *
 * ```ts
 * // HTML cannot be parsed easily
 * toDOM('<html><body><div /></body></html>'); // --> null
 *
 * // Convert a given HTML string to HTML
 * toDOM('<div><a>link</a></div>')
 * // --> <div><a>link</a></div>
 * ```
 */
export function toDOM(html: string): HTMLCollection | null {
	if (/<(html|body|head|frame(set)?)\b/.test(html)) return null;

	const template = document.createElement('template');
	template.innerHTML = html;

	return template.content.children;
}

export default toDOM;

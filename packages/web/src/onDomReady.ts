import { on } from './on.ts';

/**
 * Is the document ready state indicating that the document is ready to be manipulated
 *
 * @returns Whether the document is ready or not
 *
 * @example
 * ```ts
 * isDocComplete(); // --> true, once the DOM has finished loading
 * ```
 */
export function isDocComplete(): boolean {
	const { readyState } = document;
	return readyState === 'interactive' || readyState === 'complete';
}

/**
 * Execute a given function once the document has finished loading
 *
 * @param handler - Function to execute once the document has finished loading
 *
 * @example
 *
 * ```ts
 * domReady(() => { alert('DOM Ready') });
 * ```
 */
export function onDomReady(handler: () => void): void {
	isDocComplete()
		? handler()
		: on('readystatechange', () => handler(), { when: isDocComplete, once: true });
}

export default onDomReady;

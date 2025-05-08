import { on } from './on';

/**
 * returns whether document ready state indicates that the document is ready to be manipulated
 */
export function docComplete(): boolean {
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
 * domReady((e: Event) => { alert('DOM Ready') });
 * ```
 */
export function domReady(handler: () => void): void {
	docComplete() ? handler() : on('readystatechange', handler, { when: docComplete, once: true });
}

export default domReady;

import type { Noop } from './types';

import once from './once';



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
export default function domReady(handler: Noop): void {
  docComplete()
    ? handler()
    : once('readystatechange', handler, { when: docComplete });
}

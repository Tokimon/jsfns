import type { NotFirst } from '@jsfns/core/types.js';
import { isEventTarget } from './isEventTarget.js';

type Args = [elm: EventTarget, eventNames: string | string[], data?: unknown];

const customEvent = (name: string, data?: unknown) => {
	const options: CustomEventInit = { bubbles: true };
	if (typeof data !== 'undefined') options.detail = data;

	return new CustomEvent(name, options);
};

/**
 * Trigger one or more events on a given DOM element.
 *
 * @param elm - DOM element to trigger the event on
 * @param eventNames - Event names to trigger
 * @param data - Extra data to add to the triggered event
 * @returns The 'elm' (or document)
 *
 * @example
 *
 * ```ts
 * trigger(MyElm, 'click')
 * trigger(MyElm, 'my-event', { SomeEntry: true })
 * ```
 */
function trigger<T extends EventTarget>(elm: T, eventNames: string | string[], data?: unknown): T;

/**
 * Trigger one or more events on Document.
 *
 * @param eventNames - Event names to trigger
 * @param data - Extra data to add to the triggered event
 * @returns The 'elm' (or document)
 *
 * @example
 *
 * ```ts
 * trigger('click')
 * trigger('my-event', { SomeEntry: true })
 * ```
 */
function trigger(eventNames: string | string[], data?: unknown): Document;

function trigger(...args: Args | NotFirst<Args>): EventTarget {
	const [elm, eventNames, data] = (isEventTarget(args[0]) ? args : [document, ...args]) as Args;

	const evts = !Array.isArray(eventNames) ? [eventNames] : eventNames;

	for (const evt of evts) elm.dispatchEvent(customEvent(evt, data));

	return elm;
}

export { trigger };
export default trigger;

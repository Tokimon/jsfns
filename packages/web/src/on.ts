import type { NotFirst } from '@jsfns/core/types.js';
import { copyEvent } from './copyEvent.js';
import { isDOMElement } from './isDOMElement.js';
import { isEventTarget } from './isEventTarget.js';
import { off } from './off.js';
import type { ActualEvent, EventHandler, EventName } from './types.js';

/** The extended event listener options for the `on` function */
export type OnOptions<E extends EventName = EventName> = AddEventListenerOptions & {
	/**
	 * A method that returns true when the event should trigger
	 * Combined with `once`, it will only remove the handler when `when()` resolves to true)
	 */
	when?: (event: ActualEvent<E>) => boolean;

	/** A selector that defines which element is the actual target of the event */
	delegate?: string;
};

type Args<E extends EventName = EventName> = [
	elm: EventTarget,
	eventNames: E | E[],
	handler: EventHandler<E>,
	options?: OnOptions<E>,
];

function getDelegateTarget<E extends EventName = EventName>(
	delegate: string,
	e: Parameters<EventHandler<E>>[0],
) {
	const { target } = e;
	// Delegation does nothing for non-dom element targets
	if (isDOMElement(target)) return target.closest(delegate);
}

function onOptionsHandler<E extends EventName = EventName>(
	elm: EventTarget,
	handler: EventHandler<E>,
	options: OnOptions<E>,
) {
	const { when, once, delegate, ...rest } = options;
	if (!when && !delegate) return [handler, options] as const;

	function eventHandler(this: EventTarget, e: Parameters<EventHandler<E>>[0]) {
		if (when && when(e) !== true) return;

		// `once` is stripped from the options passed to `addEventListener` as soon as this
		// wrapper exists, so this is the only place left to honor it - and only once `when`
		// and/or `delegate` have actually been satisfied, not on every raw dispatch
		function trigger(target: Element | EventTarget, event: typeof e) {
			if (once) off(elm, e.type as E, eventHandler, options);
			return handler.call(target, event);
		}

		if (!delegate) return trigger(this, e);

		const delegateTarget = getDelegateTarget<E>(delegate, e);
		if (delegateTarget) trigger(delegateTarget, copyEvent(e, delegateTarget));
	}

	return [eventHandler, rest] as [
		EventHandler<E>,
		Omit<OnOptions<E>, 'when' | 'once' | 'delegate'>,
	];
}

/**
 * Bind an event handler for one or more event names on a given DOM element.
 *
 * @param elm - DOM element to bind the event to
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'addEventListener'
 * @typeParam E - The inferred event name(s)
 * @returns function to remove added event handlers
 *
 * @example
 *
 * ```ts
 * const removeEvent = on(MyElm, 'click', someHandler)
 * const removeEvent = on(MyElm, 'click', someHandler, { passive: true })
 * const removeEvent = on(MyElm, ['mouseenter', 'touchstart'], someHandler)
 * ```
 *
 * **When using `options.when`**
 * ```ts
 * let allowClick = false;
 * const removeEvent = on(MyElm, 'click', someHandler, { when: () => allowClick });
 *
 * // In this case the `click` event won't trigger unless "allowClick" is `true`
 * ```
 *
 * **When using `options.delegate`**
 * ```ts
 * const removeEvent = on(MyElm, 'click', someHandler, { delegate: '.click-me' });
 *
 * // Here we listen to the `click` on MyElm, but the event will only trigger
 * // if the clicked target is a child of `MyElm` and matches the given selector ('.click-me').
 * // `this` and currentTarget, will match the current ".click-me" element
 * ```
 *
 * **A combination of options**
 * ```ts
 * const removeEvent = on(MyElm, 'click', someHandler, {
 *   delegate: '.click-me',
 *   when: () => allowClick,
 *   once: true
 * });
 *
 * // In this scenario a MyElm '.click-me' child element will trigger the event handler,
 * // but only if the condition of `when` returns true ("allowClick" is `true`) and the
 * // event will trigger only once (event will be removed when the conditions for when
 * // and delegate have been fulfilled).
 * ```
 */
function on<T extends EventTarget, E extends EventName>(
	elm: T,
	eventNames: E | E[],
	handler: EventHandler<E>,
	options?: OnOptions<E>,
): () => T;

/**
 * Bind an event handler for one or more event names on `document`.
 *
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'addEventListener'
 * @typeParam E - The inferred event name(s)
 * @returns function to remove added event handlers
 *
 * @example
 *
 * ```ts
 * const removeEvent = on('click', someHandler)
 * const removeEvent = on('click', someHandler, { passive: true })
 * const removeEvent = on(['mouseenter', 'touchstart'], someHandler)
 * ```
 *
 * **When using `options.when`**
 * ```ts
 * let allowClick = false;
 * const removeEvent = on('click', someHandler, { when: () => allowClick });
 *
 * // In this case the `click` event won't trigger unless "allowClick" is `true`
 * ```
 *
 * **When using `options.delegate`**
 * ```ts
 * const removeEvent = on('click', someHandler, { delegate: '.click-me' });
 *
 * // Here we listen to the `click` on but the event will only trigger
 * // if the clicked target matches the given selector ('.click-me').
 * // `this` and currentTarget, will match the current ".click-me" element
 * ```
 *
 * **A combination of options**
 * ```ts
 * const removeEvent = on('click', someHandler, {
 *   delegate: '.click-me',
 *   when: () => allowClick,
 *   once: true
 * });
 *
 * // In this scenario a '.click-me' child element will trigger the event handler,
 * // but only if the condition of `when` returns true ("allowClick" is `true`) and the
 * // event will trigger only once (event will be removed when the conditions for when
 * // and delegate have been fulfilled).
 * ```
 */
function on<E extends EventName>(
	eventNames: E | E[],
	handler: EventHandler<E>,
	options?: OnOptions<E>,
): () => Document;

function on<E extends EventName>(...args: Args<E> | NotFirst<Args<E>>): () => EventTarget {
	let [elm, eventNames, handler, options] = (
		isEventTarget(args[0]) ? args : [document, ...args]
	) as Args<E>;

	const evts = !Array.isArray(eventNames) ? [eventNames] : eventNames;

	if (options) [handler, options] = onOptionsHandler(elm, handler, options);

	for (const evt of evts) elm.addEventListener(evt, handler as EventListener, options);

	return () => off(elm, eventNames, handler, options);
}

export { on };
export default on;

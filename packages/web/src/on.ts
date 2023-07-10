import { isFunction } from '@jsfns/core/isFunction';
import { copyEvent } from './copyEvent';
import { isDOMElement } from './isDOMElement';
import { isEventTarget } from './isEventTarget';
import { off } from './off';

export type OnOptions = AddEventListenerOptions & {
  /**
   * A method that returns true when the event should trigger
   * Combined with `once`, it will only remove the handler if the handler has triggered (when resolves to true)
   */
  when?: (event: Event) => boolean;

  /** A selector that defines which element is the actual target of the event */
  delegate?: string;
};

export type ArgsWithoutTarget = [eventNames: string | string[], handler: EventListenerOrEventListenerObject, options?: OnOptions];

export type ArgsWithTarget = [
  elm: EventTarget,
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: OnOptions
];

function onOptionsHandler(elm: EventTarget, handler: EventListenerOrEventListenerObject, options: OnOptions) {
  const { when, once, delegate, ...rest } = options;
  if (!when && !delegate) return [handler, options] as const;

  const orgHandler = isFunction(handler) ? handler : (handler as EventListenerObject).handleEvent.bind(handler);

  const eventHandler: typeof handler = (e) => {
    if (when && when(e) !== true) return;

    // We don't always remove when once is defined here, as we only should
    // remove delegation once it has hit the delegation target
    const remove = () => off(elm, e.type, eventHandler, options);

    if (!delegate) {
      if (once) remove();
      return orgHandler(e);
    }

    const { target } = e;
    // Delegation does nothing for non-dom element targets
    if (!isDOMElement(target)) return;

    const delegateTarget = target.closest(delegate);

    if (delegateTarget) {
      if (once) remove();
      return orgHandler.call(delegateTarget, copyEvent(e, delegateTarget));
    }
  };

  return [eventHandler, rest] as [EventListener, Omit<OnOptions, 'when' | 'once' | 'delegate'>];
}

/**
 * Bind an event handler for one or more event names on a given DOM element.
 *
 * @param elm - DOM element to bind the event to
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'addEventListener'
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
function on(
  elm: EventTarget,
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: OnOptions
): () => typeof elm;

/**
 * Bind an event handler for one or more event names on `document`.
 *
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'addEventListener'
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
function on(eventNames: string | string[], handler: EventListenerOrEventListenerObject, options?: OnOptions): () => Document;

function on<T extends ArgsWithTarget | ArgsWithoutTarget>(...args: T): () => T[0] | Document {
  if (!isEventTarget(args[0])) {
    const [eventNames, handler, options] = args as ArgsWithoutTarget;
    return on(document, eventNames, handler, options);
  }

  // eslint-disable-next-line prefer-const
  let [elm, eventNames, handler, options] = args as ArgsWithTarget;
  if (!Array.isArray(eventNames)) eventNames = [eventNames];

  if (options) [handler, options] = onOptionsHandler(elm, handler, options);

  eventNames.forEach((evt) => elm.addEventListener(evt, handler, options));

  return () => off(elm, eventNames, handler, options);
}

export { on };
export default on;

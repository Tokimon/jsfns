import isFunction from '@js-fns/core/isFunction';
import isEventTarget from './isEventTarget';
import off from './off';



export type ExtendedAddEventListenerOptions = AddEventListenerOptions & {
  /**
   * A method that returns true when the event should trigger
   * Combined with `once`, it will only remove the handler if the handler has triggered (when resolves to true)
   */
  when?: (event: Event) => boolean,

  /** A selector that defines which element is the actual target of the event */
  delegate?: string
}



export type argsWithoutTarget = [
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: ExtendedAddEventListenerOptions
]

export type argsWithTarget = [
  elm: EventTarget,
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: ExtendedAddEventListenerOptions
];


function delegateHandler(
  handler: EventListenerOrEventListenerObject,
  options: ExtendedAddEventListenerOptions
) {
  const { delegate, ...rest } = options;
  if (!delegate) return [handler, options] as [EventListenerOrEventListenerObject, ExtendedAddEventListenerOptions];

  const orgHandler = isFunction(handler) ? handler : handler.handleEvent;

  const eventHandler: EventListener = (e) => {
    let target: HTMLElement | null = e.target as HTMLElement;

    while (target && !target.matches(delegate)) target = target.parentElement;

    if (!target) return true;

    const evt = new window[e.constructor.name as keyof Window](e.type, e) as Event;

    Object.defineProperty(evt, 'currentTarget', {
      value: document.getElementById('notify-container'),
      writable: false,
      enumerable: true,
      configurable: true
    });

    return orgHandler.call(target, evt);
  };

  return [eventHandler, rest] as [EventListener, Omit<ExtendedAddEventListenerOptions, 'delegate'>];
}


function whenHandler(
  elm: EventTarget,
  handler: EventListenerOrEventListenerObject,
  options: ExtendedAddEventListenerOptions
) {
  const { when, once, ...rest } = options;
  if (!when) return [handler, options] as [EventListenerOrEventListenerObject, ExtendedAddEventListenerOptions];

  const orgHandler = isFunction(handler) ? handler : handler.handleEvent;

  return [
    (e) => {
      if (when(e) !== true) return true;
      if (once) off(elm, e.type, handler, options);
      return orgHandler(e);
    },
    rest
  ] as [EventListener, Omit<ExtendedAddEventListenerOptions, 'when' | 'once'>];
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
function on<T extends argsWithTarget>(...args:T): () => T[0];

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
function on(...args: argsWithoutTarget): () => Document;


function on<T extends argsWithTarget | argsWithoutTarget>(...args: T): () => T[0] | Document {
  if (!isEventTarget(args[0])) {
    const [eventNames, handler, options] = args as argsWithoutTarget;
    return on(document, eventNames, handler, options);
  }

  let [elm, eventNames, handler, options] = args as argsWithTarget;
  eventNames = (!Array.isArray(eventNames) ? [eventNames] : eventNames);

  if (options) {
    [handler, options] = whenHandler(elm, handler, options);
    [handler, options] = delegateHandler(handler, options);
  }

  eventNames.forEach((evt) => elm.addEventListener(evt, handler, options));

  return () => off(elm, eventNames, handler, options);
}

export default on;

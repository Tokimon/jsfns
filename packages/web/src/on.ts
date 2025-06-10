import { copyEvent } from "./copyEvent";
import { isDOMElement } from "./isDOMElement";
import { isEventTarget } from "./isEventTarget";
import { off } from "./off";
import type { ActualEvent, EventHandler, EventName, NotFirst } from "./types";

/** The extended event listener options for the `on` function */
export type OnOptions<E extends EventName = EventName> =
  AddEventListenerOptions & {
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
  if (!isDOMElement(target)) return;

  return target.closest(delegate);
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

    // We don't always remove when once is defined here, as we only should
    // remove delegation once it has hit the delegation target
    const trigger = (target: Element | EventTarget, event: typeof e) => {
      if (once) off(elm, e.type as E, eventHandler, options);
      return handler.call(target, event);
    };

    if (!delegate) return trigger(this, e);

    const delegateTarget = getDelegateTarget<E>(delegate, e);
    if (delegateTarget) trigger(delegateTarget, copyEvent(e, delegateTarget));
  }

  return [eventHandler, rest] as [
    EventHandler,
    Omit<OnOptions, "when" | "once" | "delegate">,
  ];
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
function on<E extends EventName>(
  elm: Args<E>[0],
  eventNames: E | E[],
  handler: EventHandler<E>,
  options?: Args<E>[3],
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
function on<E extends EventName>(
  eventNames: E | E[],
  handler: EventHandler<E>,
  options?: Args<E>[3],
): () => Document;

function on<E extends EventName>(
  ...args: Args<E> | NotFirst<Args<E>>
): () => (typeof args)[0] {
  if (!isEventTarget(args[0]))
    return on(document, ...(args as NotFirst<Args<E>>));

  let [elm, eventNames, handler, options] = args as Args<E>;
  if (!Array.isArray(eventNames)) eventNames = [eventNames];

  if (options) [handler, options] = onOptionsHandler(elm, handler, options);

  for (const evt of eventNames)
    elm.addEventListener(evt, handler as EventListener, options);

  return () => off(elm, eventNames, handler, options);
}

export { on };
export default on;

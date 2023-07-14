import { isEventTarget } from './isEventTarget';
import { type EventHandler, type EventName, type NotFirst } from './types';

type Args = [elm: EventTarget, eventNames: EventName | EventName[], handler: EventHandler, options?: AddEventListenerOptions];

/**
 * Bind an event handler for one or more event names on a given DOM element.
 *
 * @param elm - DOM element to bind the event to
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'removeEventListener'
 * @returns `elm`
 *
 * @example
 *
 * ```ts
 * off(MyElm, 'click', () => {})
 * off(MyElm, 'click', () => {}, { passive: true })
 * off(MyElm, ['mouseenter', 'touchstart'], () => {})
 * ```
 */
function off<E extends EventName>(elm: Args[0], eventNames: E | E[], handler: EventHandler<E>, options?: Args[3]): typeof elm;
// function off(
//   elm: EventTarget,
//   eventNames: string | string[],
//   handler: EventListenerOrEventListenerObject,
//   options?: AddEventListenerOptions
// ): typeof elm;

/**
 * Bind an event handler for one or more event names to `document`
 *
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'removeEventListener'
 * @return document
 *
 * @example
 *
 * ```ts
 * off('click', () => {})
 * off('click', () => {}, { passive: true })
 * off(['mouseenter', 'touchstart'], () => {})
 * ```
 */
function off<E extends EventName>(eventNames: E | E[], handler: EventHandler<E>, options?: Args[3]): Document;
// function off(eventNames: string | string[], handler: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): Document;

function off(...args: Args | NotFirst<Args>): (typeof args)[0] {
  if (!isEventTarget(args[0])) return off(document, ...(args as NotFirst<Args>));

  // eslint-disable-next-line prefer-const
  let [elm, eventNames, handler, options] = args as Args;
  if (!Array.isArray(eventNames)) eventNames = [eventNames];

  eventNames.forEach((evt) => elm.removeEventListener(evt, handler as EventListener, options));

  return elm;
}

export { off };
export default off;

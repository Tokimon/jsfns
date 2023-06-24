import { isEventTarget } from './isEventTarget';

export type argsWithTarget = [
  elm: EventTarget,
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions
];

export type argsWithoutTarget = [
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions
];

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
function off<T extends argsWithTarget>(...args: T): T[0];

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
function off(...args: argsWithoutTarget): Document;

function off<T extends argsWithTarget | argsWithoutTarget>(...args: T): T[0] | Document {
  if (!isEventTarget(args[0])) {
    const [eventNames, handler, options] = args as argsWithoutTarget;
    return off(document, eventNames, handler, options);
  }

  // eslint-disable-next-line prefer-const
  let [elm, eventNames, handler, options] = args as argsWithTarget;
  if (!Array.isArray(eventNames)) eventNames = [eventNames];

  eventNames.forEach((evt) => elm.removeEventListener(evt, handler, options));

  return elm;
}

export { off };
export default off;

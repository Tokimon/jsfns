import { isEventTarget } from './isEventTarget';
import { type NotFirst } from './types';

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
function trigger(elm: Args[0], eventNames: Args[1], data?: Args[2]): typeof elm;

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
function trigger(eventNames: Args[1], data?: Args[2]): Document;

function trigger(...args: Args | NotFirst<Args>): Args[0] {
  if (!isEventTarget(args[0])) return trigger(document, ...(args as NotFirst<Args>));

  // eslint-disable-next-line prefer-const
  let [elm, eventNames, data] = args as Args;
  if (!Array.isArray(eventNames)) eventNames = [eventNames];

  eventNames.forEach((evt: string) => elm.dispatchEvent(customEvent(evt, data)));

  return elm;
}

export { trigger };
export default trigger;

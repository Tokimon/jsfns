import { isEventTarget } from './isEventTarget';

const customEvent = (name: string, data?: unknown) => {
  const options: CustomEventInit = { bubbles: true };
  if (typeof data !== 'undefined') {
    options.detail = data;
  }
  return new CustomEvent(name, options);
};

export type ArgsWithoutTarget = [eventNames: string | string[], data?: unknown];

export type ArgsWithTarget = [elm: EventTarget, eventNames: string | string[], data?: unknown];

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
function trigger<T extends ArgsWithTarget>(...args: T): EventTarget;

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
function trigger(...args: ArgsWithoutTarget): EventTarget;

function trigger<T extends ArgsWithTarget | ArgsWithoutTarget>(...args: T): EventTarget {
  if (!isEventTarget(args[0])) {
    const [eventNames, data] = args;
    return trigger(document, eventNames, data);
  }

  // eslint-disable-next-line prefer-const
  let [elm, eventNames, data] = args as ArgsWithTarget;
  if (!Array.isArray(eventNames)) eventNames = [eventNames];

  eventNames.forEach((evt: string) => elm.dispatchEvent(customEvent(evt, data)));

  return elm;
}

export { trigger };
export default trigger;

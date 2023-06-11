import isEventTarget from './isEventTarget';



/**
 * Bind an event handler for one or more event names on a given DOM element.
 *
 * @param elm - DOM element to bind the event to
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'addEventListener'
 * @returns `elm`
 */
function on(
  elm: EventTarget,
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions
): EventTarget;

/**
 * Bind an event handler for one or more event names to `document`
 *
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'addEventListener'
 * @returns `document`
 */
function on(
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions
): EventTarget;



function on(
  elm: EventTarget | string | string[],
  eventNames: string | string[] | EventListenerOrEventListenerObject,
  handler?: EventListenerOrEventListenerObject | AddEventListenerOptions,
  options?: AddEventListenerOptions
): EventTarget {
  if (!isEventTarget(elm)) {
    options = handler as EventListenerOptions;
    handler = eventNames as EventListenerOrEventListenerObject;
    eventNames = elm;
    elm = document;
  }

  if (!Array.isArray(eventNames)) eventNames = [eventNames as string];

  eventNames.forEach(
    (evt) => (elm as EventTarget).addEventListener(
      evt,
      handler as EventListenerOrEventListenerObject,
      options
    )
  );

  return elm;
}

export default on;

export const copyEvent = (event: Event, currentTarget?: EventTarget) => {
  const evtType = event.constructor.name as keyof Window;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const copy = new window[evtType](event.type, event) as Event;

  Object.defineProperty(copy, 'currentTarget', {
    value: currentTarget ?? event.currentTarget,
    writable: false,
    enumerable: true,
    configurable: true,
  });

  Object.defineProperty(copy, 'target', {
    value: event.target,
    writable: false,
    enumerable: true,
    configurable: true,
  });

  return copy;
};

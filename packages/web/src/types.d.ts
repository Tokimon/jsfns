export type GeneralWindow = Window | typeof window;

export type NotFirst<T extends Array<unknown>> = T extends [arg0: T[0], ...rest: infer R] ? R : never;

export type EventName = keyof DocumentEventMap | string;
export type EventHandler<E extends EventName = EventName> = (
  this: EventSource | EventTarget,
  event: E extends keyof DocumentEventMap ? DocumentEventMap[E] : CustomEvent
) => unknown;

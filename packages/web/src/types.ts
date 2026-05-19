/**
 * Represents any `Window` instance, including the global `window` object.
 */
export type GeneralWindow = Window | typeof window;

/**
 * A valid event name string. Includes all standard `DocumentEventMap` keys (like `"click"`, `"keydown"`)
 * as well as arbitrary custom string values.
 */
export type EventName = keyof DocumentEventMap | string;

/**
 * Resolves the actual event type given an event name.
 *
 * - If the name is a known DOM event (e.g. `"click"`), it resolves to that event type.
 * - If the name is a custom string, it resolves to `CustomEvent<E>`.
 *
 * @example
 * ```ts
 * type ClickEvent = ActualEvent<'click'>; // MouseEvent
 * type Custom = ActualEvent<'my-event'>; // CustomEvent<'my-event'>
 * ```
 */
export type ActualEvent<E extends EventName = EventName> = E extends keyof DocumentEventMap
	? DocumentEventMap[E]
	: CustomEvent<E>;

/**
 * A general event handler function for both native and custom events.
 */
export type EventHandler<E extends EventName = EventName> = (
	this: EventSource | EventTarget,
	event: ActualEvent<E>,
) => unknown;

/**
 * Represents a 2D size in pixels.
 */
export type Size = {
	/** Width in pixels */
	width: number;
	/** Height in pixels */
	height: number;
};

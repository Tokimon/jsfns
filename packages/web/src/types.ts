/**
 * Represents any `Window` instance, including the global `window` object.
 */
export type GeneralWindow = Window | typeof window;

/**
 * A `Window` together with its global scope, exposing the realm's own
 * constructors (e.g. `Blob`, `HTMLElement`) for cross-realm checks.
 */
export type GlobalWindow = Window & typeof globalThis;

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
 * @typeParam E - The event name to resolve the actual event type for
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
 *
 * @typeParam E - The event name the handler is bound to
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

/** A single lowercase ASCII letter */
export type Letter =
	| 'a'
	| 'b'
	| 'c'
	| 'd'
	| 'e'
	| 'f'
	| 'g'
	| 'h'
	| 'i'
	| 'j'
	| 'k'
	| 'l'
	| 'm'
	| 'n'
	| 'o'
	| 'p'
	| 'q'
	| 'r'
	| 's'
	| 't'
	| 'u'
	| 'v'
	| 'w'
	| 'x'
	| 'y'
	| 'z';

/** The leading run of lowercase letters in `S`, mirroring `parseSelector`'s `/^[a-z]+/` regex */
export type LeadingLetters<S extends string> = S extends `${infer Head}${infer Rest}`
	? Head extends Letter
		? `${Head}${LeadingLetters<Rest>}`
		: ''
	: '';

/** The tag name a given HTML or selector string leads with (an optional `<` is skipped), or `''` if it has none */
export type TagFromMarkup<S extends string> = S extends `<${infer Rest}`
	? LeadingLetters<Rest>
	: LeadingLetters<S>;

/**
 * The DOM element type for a given HTML or selector string, inferred from its leading
 * tag name (e.g. `'<input type="text">'`, `'span.my-class'` or a bare `'span'`) the same
 * way `parseSelector` does - falling back to `HTMLDivElement` only when there is no
 * explicit tag name at all (e.g. `'.my-class'`), just as `parseSelector` and
 * `createElement` do. Falls back to the generic `HTMLElement` when a tag name is
 * present but not recognized (e.g. a hyphenated custom element) or when `S` is a
 * widened, non-literal `string` inference has nothing to go on. Pass an explicit type
 * argument (e.g. `append<E>(...)`) to override any of these when it isn't accurate.
 */
export type ElementFromMarkup<S extends string> = string extends S
	? HTMLElement
	: TagFromMarkup<S> extends infer Tag extends string
		? Tag extends ''
			? HTMLDivElement
			: Tag extends keyof HTMLElementTagNameMap
				? HTMLElementTagNameMap[Tag]
				: HTMLElement
		: HTMLElement;

/**
 * The node/element type a DOM-insertion function (`append`, `prepend`, `insertBefore`,
 * `insertAfter`, `wrap`, ...) returns for a given `insertElm` argument: `T` itself when it
 * is already a `Node` (the same reference is returned), or {@link ElementFromMarkup}`<T>`
 * when it is a `string` (an element is created from it). Distributes over a union `T`, so
 * a value whose type is already the widened `Node | string` (e.g. forwarded from another
 * function's own union-typed parameter) still resolves to a union of both branches instead
 * of collapsing to a single generic type.
 */
export type InsertResult<T extends Node | string> = T extends string ? ElementFromMarkup<T> : T;

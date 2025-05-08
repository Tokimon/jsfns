/**
 * Copies a given event and optionally changes the `currentTarget`
 *
 * @param event - The event to copy
 * @param currentTarget - Element to define as currentTarget (falls back to the event currentTarget if not defined)
 * @returns The copied event
 *
 * @examples
 *
 * ```ts
 * copyEvent(SomeEvent, MyNewCurrentTargetElement)
 * ```
 */
export const copyEvent = <T extends Event>(event: T, currentTarget?: EventTarget): T => {
	const evtType = event.constructor.name as keyof Window;
	const copy = new window[evtType](event.type, event) as T;

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

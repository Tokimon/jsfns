import type { Dictionary } from './types.js';

type SubscriptionHandler<TEvents extends Dictionary> = (data: TEvents[keyof TEvents]) => unknown;

/** Options for {@link MicroEvents.subscribe} to control when and how long a handler stays subscribed */
export type SubscribeOptions<TEvents extends Dictionary, K extends keyof TEvents> = {
	/** Only invoke the handler when this returns true */
	when?: (data: TEvents[K]) => boolean;
	/** Automatically unsubscribe after the handler runs once (respects `when`, if given) */
	once?: boolean;
};

/**
 * A simple, environment-agnostic event bus. Instantiate once and use that single
 * instance to subscribe to and trigger typed events, without binding to any other source.
 *
 * @typeParam TEvents - A dictionary mapping event names to the type of data they carry
 *
 * @example
 *
 * ```ts
 * const events = new MicroEvents<{ greet: string }>();
 * const unsubscribe = events.subscribe('greet', (name) => console.log(`Hello, ${name}!`));
 *
 * events.trigger('greet', 'World'); // Logs: "Hello, World!"
 * unsubscribe();
 * ```
 */
export class MicroEvents<TEvents extends Dictionary> {
	#subs = new Map<keyof TEvents, Set<SubscriptionHandler<TEvents>>>();

	/**
	 * Subscribe a handler to the given event
	 *
	 * @param eventName - The event to subscribe to
	 * @param handler - Handler to call whenever the event is triggered
	 * @param options - Options to control when and how long the handler stays subscribed
	 * @typeParam K - The inferred event name
	 * @returns A function that removes this subscription when called
	 *
	 * @example
	 *
	 * ```ts
	 * const unsubscribe = events.subscribe('greet', (name) => console.log(name));
	 *
	 * events.subscribe('greet', (name) => console.log(name), { once: true });
	 * events.subscribe('greet', (name) => console.log(name), { when: (name) => name !== '' });
	 * ```
	 */
	subscribe<K extends keyof TEvents>(
		eventName: K,
		handler: (data: TEvents[K]) => unknown,
		options?: SubscribeOptions<TEvents, K>,
	): () => void {
		let fn = handler;
		const { when, once } = options ?? {};

		if (when || once) {
			fn = (data) => {
				if (when && !when(data)) return;
				if (once) this.unsubscribe(eventName, fn);
				return handler(data);
			};
		}

		const set = this.#subs.get(eventName) ?? new Set();
		set.add(fn as SubscriptionHandler<TEvents>);
		this.#subs.set(eventName, set);

		return () => this.unsubscribe(eventName, fn);
	}

	/**
	 * Remove a specific handler previously subscribed to the given event
	 *
	 * @param eventName - The event to remove the handler from
	 * @param handler - The handler to remove (the exact reference passed to, or returned by, `subscribe`)
	 * @typeParam K - The inferred event name
	 */
	unsubscribe<K extends keyof TEvents>(eventName: K, handler: (data: TEvents[K]) => unknown): void {
		this.#subs.get(eventName)?.delete(handler as SubscriptionHandler<TEvents>);
	}

	/**
	 * Remove every handler subscribed to the given event
	 *
	 * @param eventName - The event to clear all handlers from
	 * @typeParam K - The inferred event name
	 */
	unsubscribeAll<K extends keyof TEvents>(eventName: K): void {
		this.#subs.get(eventName)?.clear();
	}

	/**
	 * Call every handler subscribed to the given event with the given data
	 *
	 * @param eventName - The event to trigger
	 * @param data - The data to pass to each subscribed handler
	 * @typeParam K - The inferred event name
	 */
	trigger<K extends keyof TEvents>(eventName: K, data: TEvents[K]): void {
		for (const fn of this.#subs.get(eventName) ?? []) fn(data);
	}
}

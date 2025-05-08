type DebounceCallback = (...args: unknown[]) => void;

export type DebouncedFunction<T extends DebounceCallback> = T & {
	cancelDebounce: () => void;
};

/**
 * Ensure that the givcen `callback` function will only be called `ms` milliseconds after the last call.
 * This ensures to not trigger too many consecutive calls, but only the last in the sequence.
 *
 * @param callback - The function to add debounce to
 * @param ms - Number of milliseconds without another call to trigger the last function
 * @returns The debounce enabled function
 */
export function debounce<T extends DebounceCallback>(callback: T, ms = 200) {
	let id: ReturnType<typeof setTimeout>;
	const cancelDebounce = () => clearTimeout(id);

	const fn = ((...args: Parameters<T>) => {
		cancelDebounce();
		id = setTimeout(() => callback(...args), ms);
	}) as DebouncedFunction<T>;

	fn.cancelDebounce = cancelDebounce;

	return fn;
}

export default debounce;

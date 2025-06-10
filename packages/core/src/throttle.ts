/**
 * Ensure that the given `callback` function can only be called every `ms` milliseconds
 *
 * @param callback - The function to throttle
 * @param ms - Number of milliseconds before the function can be called again
 * @typeParam T - The inferred type of the given callback function that need to be throttled
 * @returns The throttled function
 */
export function throttle<T extends (...args: unknown[]) => void>(
  callback: T,
  ms = 200,
) {
  let canCall = true;

  function fn(...args: Parameters<T>) {
    if (!canCall) return;

    callback(...args);
    canCall = false;

    setTimeout(() => {
      canCall = true;
    }, ms);
  }

  return fn as T;
}

export default throttle;

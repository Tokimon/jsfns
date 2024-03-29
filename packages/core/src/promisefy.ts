export type NodeLikeCallback = (err?: string | Error | null, data?: unknown) => unknown;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromisefyCallback = (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromisefiedFunction = (...args: any[]) => Promise<any>;

/**
 * Converts a callback based action into one returning a Promise instead.
 *
 * @param settings - The settings for the string formatting
 * @param str - The string to format
 *
 * @returns The formatted string
 *
 * @example
 * ```ts
 * function action(name, callback) { ... callback(); }
 *
 * action = promisefy(action);
 *
 * action
 *   .then(() => 'all good')
 *   .catch(() => 'Something went wrong');
 * ```
 */
export function promisefy(fn: PromisefyCallback): PromisefiedFunction {
  return (...args: unknown[]) =>
    new Promise((resolve, reject) => {
      const cb = (err?: string | Error | null, data?: unknown) => (err ? reject(err) : resolve(data));

      fn(...args, cb);
    });
}

export default promisefy;

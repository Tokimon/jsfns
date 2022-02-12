/* eslint-disable @typescript-eslint/no-explicit-any */

export type NodeLikeCallback = (err?: string | Error | null, data?: unknown) => unknown;
type PromisefyCallback = (...args: any[]) => unknown;
type PromisefiedFunction = (...args: any[]) => Promise<unknown>;



/**
 * Converts a callback based action into one returning a Promise instead.
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
 *
 * @param settings - The settings for the string formatting
 * @param str - The string to format
 * @return - The formatted string
 */
export default function promisefy(fn: PromisefyCallback): PromisefiedFunction {
  return (...args: any[]) =>
    new Promise(
      (resolve, reject) => {
        const cb = (err?: string | Error | null, data?: unknown) =>
          err ? reject(err) : resolve(data);

        fn(...args, cb);
      }
    );
}

/** The callback style method to promisefy */
// biome-ignore lint/suspicious/noExplicitAny: cannot be done with "unknown" it has to be "any"
export type PromisefyCallback = (...args: any[]) => any;

/** The promisefied method */
// biome-ignore lint/suspicious/noExplicitAny: cannot be done with "unknown" it has to be "any"
export type PromisefiedFunction = (...args: any[]) => Promise<any>;

/**
 * Converts a callback based action into one returning a Promise instead.
 *
 * @param fn - The callback to promisefy
 *
 * @returns The promisefied function
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
      const cb = (err?: string | Error | null, data?: unknown) =>
        err ? reject(err) : resolve(data);

      fn(...args, cb);
    });
}

export default promisefy;

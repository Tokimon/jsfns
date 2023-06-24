import { isFunction } from './isFunction';

/**
 * Determine if the given argument is a Generator object.
 * (A generator is the one created when calling a generator function)
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument a Generator like function or not
 *
 * @example
 * ```ts
 * function *gen() {}
 *
 * isGeneratorLike(gen()); // --> true
 * isGeneratorLike({ next() {}, throw() {} return() {} [Symbol.iterator]() {} }); // --> true
 * isGeneratorLike(() => {}); // --> false
 * ```
 */
export function isGeneratorLike(x: unknown): x is Generator {
  if (x == null) return false;

  const i = x as Iterator<unknown>;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  return isFunction(i.next) && isFunction(i.throw) && isFunction(i.return);
}

/**
 * Determine if the given argument is a Generator Function
 *
 * @example
 * ```ts
 * function* gen() {}
 *
 * isGeneratorFunction(gen); // --> true
 * isGeneratorFunction(() => {}); // --> false
 * ```
 *
 * @param x - Argument to test
 * @returns Whether the argument a Generator or not
 */
export function isGenerator(x: unknown): x is GeneratorFunction {
  if (!x?.constructor) return false;

  return x.constructor.name === 'GeneratorFunction' || isGeneratorLike(Object.getPrototypeOf(x.constructor));
}

export default isGenerator;

import isFunction from './isFunction';



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
 * isGeneratorLike(gen()); // -> true
 * isGeneratorLike({ next() {}, throw() {} return() {} [Symbol.iterator]() {} }); // -> true
 * isGeneratorLike(() => {}); // -> false
 * ```
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isGeneratorLike(x: any): x is Generator {
  return x != null
    && isFunction(x.next)
    && isFunction(x.throw)
    && isFunction(x.return);
  // && isFunction(x[Symbol.iterator]);
}



/**
 * Determine if the given argument is a Generator Function
 *
 * @example
 * ```ts
 * function* gen() {}
 *
 * isGeneratorFunction(gen); // -> true
 * isGeneratorFunction(() => {}); // -> false
 * ```
 *
 * @param x - Argument to test
 * @returns Whether the argument a Generator or not
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isGenerator(x: any): x is GeneratorFunction {
  if (!x || !x.constructor) { return false; }

  const { name, displayName, prototype } = x.constructor;

  return name === 'GeneratorFunction'
    || displayName === 'GeneratorFunction'
    || isGeneratorLike(prototype);
}

export default isGenerator;

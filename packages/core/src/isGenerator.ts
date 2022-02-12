import isFunction from './isFunction';



/**
 * Determine if the given argument is a Generator object.
 * (A generator is the one created when calling a generator function)
 *
 * @example
 * ```ts
 * function *gen() {}
 *
 * isGenerator(gen()); // -> true
 * isGenerator({ next() {}, throw() {} return() {} [Symbol.iterator]() {} }); // -> true
 * isGenerator(() => {}); // -> false
 * ```
 *
 * @param x - Argument to test
 * @return - Whether the argument a Generator like function or not
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function isGenerator(x: any): x is Generator {
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
 * @return - Whether the argument a Generator or not
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export default function isGeneratorFunction(x: any): x is GeneratorFunction {
  if (!x || !x.constructor) { return false; }

  const { name, displayName, prototype } = x.constructor;

  return name === 'GeneratorFunction'
    || displayName === 'GeneratorFunction'
    || isGenerator(prototype);
}

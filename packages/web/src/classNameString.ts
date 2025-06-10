import { isObject } from "@jsfns/core/isObject";
import { isString } from "@jsfns/core/isString";

/** The various input options for classNameString */
export type Option = string | Record<string, boolean | undefined>;

const combine = (...args: [string, string]) => args.join(" ");

/**
 * Create a string of names that will be used as class names for a given element.
 *
 * @param args a single class name or a record of class name: boolean
 * @returns The list of class names (eg. "my-elm open active")
 *
 * @example
 *
 * ```ts
 * classNameString('my-elm', 'open', 'active') // --> "my-elm open active"
 * classNameString(['my-elm', 'open', 'active']) // --> "my-elm open active"
 * classNameString('my-elm', ['open', 'active']) // --> "my-elm open active"
 * classNameString('my-elm', { open: true, active: true }) // --> "my-elm open active"
 * ```
 */
export function classNameString(...args: (Option | Option[])[]): string {
  let str = "";

  for (let i = 0; i < args.length; i++) {
    const input = args[i];

    if (isString(input)) {
      str = combine(str, input);
    } else if (Array.isArray(input)) {
      str = combine(str, classNameString(...input));
    } else if (isObject(input)) {
      for (const key in input) str = combine(str, input[key] ? key : "");
    }
  }

  return str;
}

export default classNameString;

export type cnObj = { [key: string]: boolean; };
export type Option = string | cnObj;

const combine = (base: string, cn: string) => base + (base && cn && ' ') + cn;

/**
 * Create a string of names that will be used as class names for a given element.
 *
 * @param args a single class name or a record of class name: boolean
 * @returns The list of class names (eg. "my-elm open active")
 *
 * @example
 *
 * ```ts
 * classNames('my-elm', 'open', 'active') // --> "my-elm open active"
 * classNames(['my-elm', 'open', 'active']) // --> "my-elm open active"
 * classNames('my-elm', ['open', 'active']) // --> "my-elm open active"
 * classNames('my-elm', { open: true, active: true }) // --> "my-elm open active"
 * ```
 */
const classNameString = (...args: (Option | Option[])[]): string => {
  let str = '';

  for (let i = 0; i < args.length; i++) {
    const input = args[i];

    if (typeof input === 'string') str = combine(str, input);
    else if (Array.isArray(input)) str = combine(str, classNameString(...input));
    else if (typeof input === 'object')
      for (const key in input) str = combine(str, input[key] ? key : '');
  }

  return str;
};

export default classNameString;

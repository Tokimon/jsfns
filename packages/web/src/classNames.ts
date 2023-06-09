export type cnObj = { [key: string]: boolean; };
export type Option = string | cnObj;

const combine = (base: string, cn: string) => base + (base && cn && ' ') + cn;
const classNames = (...args: (Option | Option[])[]): string => {
  let str = '';

  for (let i = 0; i < args.length; i++) {
    const input = args[i];

    if (typeof input === 'string') str = combine(str, input);
    else if (Array.isArray(input)) str = combine(str, classNames(...input));
    else if (typeof input === 'object')
      for (const key in input) str = combine(str, input[key] ? key : '');
  }

  return str;
};

export default classNames;

export const surround =
  (str: string, char: string) =>
  (add?: boolean, noLeft?: boolean): string => {
    if (!add) return str;

    return (noLeft ? '' : char) + str + char;
  };

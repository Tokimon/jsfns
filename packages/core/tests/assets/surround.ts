export function surround(str: string, char: string) {
  return (add?: boolean, noLeft?: boolean): string =>
    add ? (noLeft ? "" : char) + str + char : str;
}

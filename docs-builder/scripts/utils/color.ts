const RESET = '\x1b[0m';
const BLUE = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';

export const green = (text: string) => GREEN + text + RESET;
export const yellow = (text: string) => YELLOW + text + RESET;
export const blue = (text: string) => BLUE + text + RESET;

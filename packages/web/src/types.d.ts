export type GeneralWindow = Window | typeof window;

export type NotFirst<T extends Array<unknown>> = T extends [arg0: T[0], ...rest: infer R] ? R : never;


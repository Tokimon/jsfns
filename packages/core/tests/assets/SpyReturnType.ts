import type { SpyInstance } from 'jest-mock';

export { SpyInstance };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SpyReturnType<F extends (...args: any[]) => any> = SpyInstance<ReturnType<F>, Parameters<F>>;

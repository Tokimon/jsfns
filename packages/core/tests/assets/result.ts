type ResultCreator<T> = (props: T) => string;
export type TestInput<T> = [string, string | ResultCreator<T>];

export const result = <T>(val: string | ResultCreator<T>, settings?: T): string =>
	typeof val === 'function' ? val(settings || ({} as T)) : val;

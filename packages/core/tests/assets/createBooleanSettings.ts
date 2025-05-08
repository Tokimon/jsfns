export function createBooleanSettings<T>(keys: (keyof T)[], prev: T = {} as T): T[] {
	const x: T[] = [];

	while (keys) {
		const key = keys.pop();
		if (!key) {
			break;
		}

		const _true = { ...prev, [key]: true };
		const _false = { ...prev, [key]: false };

		x.push(
			_true,
			_false,
			...createBooleanSettings<T>([...keys], _true),
			...createBooleanSettings<T>([...keys], _false),
		);
	}

	return x;
}

export function match(param: string) {
	return /^\d+.\d+.x$/.test(param);
}

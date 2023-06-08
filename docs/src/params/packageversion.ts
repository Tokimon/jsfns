import packages from '$lib/data/packages.json';

export function match(param: string) {
	const regexs = Object.entries(packages).map(
		([pkg, versions]) => `${pkg}(\\/(${versions.join('|')})?)?$`
	);
	return new RegExp(regexs.join('|')).test(param);
}

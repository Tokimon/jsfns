export function toWords(str: string): string[] {
	return str
		.split(
			/(?:[\W_]+)|(?<=[a-z])(?=[A-Z])|(?<=[A-Za-z])(?=\d)|(?<=\d)(?=[A-Za-z])|(?<=[A-Z]+)(?=[A-Z][a-z])/,
		)
		.filter(Boolean);
}

export default toWords;

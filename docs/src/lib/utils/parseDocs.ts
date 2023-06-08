import type { CallSignatureKind, ParameterKind, RootDocObject } from '$lib/types';

type FunctionOverride = {
	parameters: ParameterKind[];
	description?: string;
	returns?: string;
	examples?: string[];
};

type FunctionDescription = {
	name: string;
	overrides?: FunctionOverride[];
};

const parseCallSignature = ({ parameters, comment }: CallSignatureKind): FunctionOverride => ({
	parameters,
	returns: comment?.returns,
	examples: comment?.tags?.filter((c) => c.tag === 'example').map((c) => c.text)
});

export const parseDocs = (docs: RootDocObject) => {
	const { name, children } = docs;

	const functions: FunctionDescription[] = [];
	const types = {};

	children.forEach((module) => {
		if (module.kind !== 2) return console.warn('Not a module', module);

		let overrides: FunctionOverride[] | undefined;

		for (const child of module.children) {
			if (child.kind === 64) {
				overrides = child.signatures
					?.filter(({ name }) => name === 'default')
					.map(parseCallSignature);
			}
		}

		const funcDesc: FunctionDescription = {
			name,
			overrides
		};

		functions.push(funcDesc);
	});
};

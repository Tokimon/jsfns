import { buildFunction } from '~/scripts/utils/buildFunction';
import { buildSummary } from '~/scripts/utils/buildSummary';
import { getFunctions } from '~/scripts/utils/getFunctions';
import { TSCodeMarkdown, markdown } from '~/scripts/utils/markdown';
import { findTypeReferences, get } from '~/scripts/utils/typeReferences';
import { createTypeString } from '~/scripts/utils/typeString';
import { Kind_Module } from './types';

type ModuleFunction = {
	definition: string; // markdown html
	comment: string; // markdown html
	examples: string[]; // markdown html
	typesMarkdown: string; // markdown html
};

type ModuleEntry = {
	name: string;
	functions: ModuleFunction[];
};

export function prepareModules(modules: Kind_Module[]) {
	const entries: ModuleEntry[] = [];

	for (const module of modules) {
		findTypeReferences(module);

		const functions = getFunctions(module).flatMap((func) => {
			return func.signatures.map((signature): ModuleFunction => {
				const types: string[] = [];
				const typeString = createTypeString(func.name, types);

				const { comment } = signature;

				const examples =
					comment?.blockTags
						?.filter(({ tag }) => tag === '@example')
						.map(({ content }) => markdown(buildSummary(content))) || [];

				return {
					definition: TSCodeMarkdown(buildFunction(typeString, func.name, signature)),
					comment: markdown(buildSummary(comment?.summary)),
					examples,
					typesMarkdown: TSCodeMarkdown(types.map((type) => get()[type]).join('\n'))
				};
			});
		});

		entries.push({ name: module.name, functions });
	}

	return entries.sort((a, b) => {
		const A = a.name.toLowerCase();
		const B = b.name.toLowerCase();
		return A > B ? 1 : A === B ? 0 : -1;
	});
}

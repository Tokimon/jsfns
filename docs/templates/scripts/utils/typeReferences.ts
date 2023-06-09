import { buildTypeAlias } from '~/scripts/utils/buildTypeAlias';
import { Kind, type Kind_Module, type Kind_TypeAlias } from '~/scripts/types';
import { TSCodeMarkdown } from './markdown';

const store: Record<string, string> = {};

export const add = (type: Kind_TypeAlias) => {
	if (!store[type.name]) store[type.name] = buildTypeAlias(type);
};

export const get = () => store;
export const getArray = () =>
	Object.entries(store).map(([name, content]) => ({ name, markdown: TSCodeMarkdown(content) }));

export function findTypeReferences(module: Kind_Module) {
	for (const child of module.children) if (child.kind === Kind.TypeAlias) add(child);
}

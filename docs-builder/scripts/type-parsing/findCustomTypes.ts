import { ReflectionKind } from 'typedoc';
import type { Kind_Module, Kind_TypeAlias } from '~docs-builder/types';
import { buildTypeAlias } from './buildTypeAlias';
import { TSCodeMarkdown } from './markdown';

const store: Record<string, string> = {};

export const addCustomType = (type: Kind_TypeAlias) => {
  if (!store[type.name]) store[type.name] = buildTypeAlias(type);
};

export const getCustomTypes = () => store;
export const getCustomTypesArray = () => Object.entries(store).map(([name, content]) => ({ name, markdown: TSCodeMarkdown(content) }));

export function findCustomTypes(module: Kind_Module) {
  for (const child of module.children) if (child.kind === ReflectionKind.TypeAlias) addCustomType(child);
}

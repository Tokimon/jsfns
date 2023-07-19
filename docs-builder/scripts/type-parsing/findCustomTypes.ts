import { ReflectionKind } from 'typedoc';
import type { Kind_Module, Kind_TypeAlias } from '~docs-builder/types';
import { buildTypeAlias } from './buildTypeAlias';
import { TSCodeMarkdown } from './markdown';

const store: Record<string, { type: string; moduleName: string }> = {};

export const addCustomType = (type: Kind_TypeAlias, moduleName: string) => {
  if (!store[type.name]) store[type.name] = { type: buildTypeAlias(type), moduleName };
};

export const getCustomTypesForModule = (moduleName: string) =>
  Object.values(store)
    .filter((entry) => entry.moduleName === moduleName)
    .map(({ type }) => type)
    .join('\n\n');

export const getCustomTypesArray = () =>
  Object.entries(store).map(([name, { type, moduleName }]) => ({ name, markdown: TSCodeMarkdown(type), moduleName }));

export function findCustomTypes(module: Kind_Module) {
  for (const child of module.children) if (child.kind === ReflectionKind.TypeAlias) addCustomType(child, module.name);
}

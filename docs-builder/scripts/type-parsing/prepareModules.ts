import { buildFunction } from './buildFunction';
import { buildSummary } from './buildSummary';
import { getFunctions } from './getFunctions';
import { TSCodeMarkdown, markdown } from './markdown';
import { findCustomTypes, getCustomTypes } from './findCustomTypes';
import { createTypeString } from './typeString';
import { Kind_Module } from '~/types';

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
    findCustomTypes(module);

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
          typesMarkdown: TSCodeMarkdown(types.map((type) => getCustomTypes()[type]).join('\n')),
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

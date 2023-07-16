import { type Kind_Module } from '~docs-builder/types';
import { buildSignature } from './buildSignature';
import { buildSummary } from './buildSummary';
import { findCustomTypes, getCustomTypes } from './findCustomTypes';
import { getFunctions } from './getFunctions';
import { TSCodeMarkdown, markdown } from './markdown';
import { createTypeString } from './typeString';

type ModuleFunction = {
  definition: string; // markdown html
  comment: string; // markdown html
  examples: string[]; // markdown html
  remarks: string[]; // markdown html
  descriptions: string; // markdown html
  typesMarkdown: string; // markdown html
};

export type ModuleEntry = {
  name: string;
  functions: ModuleFunction[];
};

export function prepareModules(modules: Kind_Module[]) {
  const entries: ModuleEntry[] = [];

  for (const module of modules) {
    findCustomTypes(module);

    if (module.name === 'types') continue;

    const functions = getFunctions(module).flatMap((func) => {
      return func.signatures.map((signature): ModuleFunction => {
        const types: string[] = [];
        const typeString = createTypeString(types);

        const { comment } = signature;

        const examples: string[] = [];
        const remarks: string[] = [];
        const descriptions: string[] = [];

        for (const { tag, content } of comment?.blockTags || []) {
          if (tag.startsWith('@example')) examples.push(markdown(buildSummary(content)));
          else if (tag.startsWith('@remark')) remarks.push(markdown(buildSummary(content)));
          else descriptions.push(markdown('<span class="hljs-doctag">' + tag + '</span> : ' + buildSummary(content)));
        }

        return {
          definition: buildSignature(typeString, func.name, signature),
          comment: markdown(buildSummary(comment?.summary)),
          examples,
          remarks,
          descriptions: descriptions.join('\n'),
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

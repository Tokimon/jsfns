import ejs from 'ejs';
import { readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'path';
import { type ModuleEntry } from '~docs-builder/type-parsing/prepareModules';

type BuildReadmeProps = {
  path: string;
  packageName: string;
  modules: ModuleEntry[];
};

export const buildReadme = async ({ path, packageName, modules }: BuildReadmeProps) => {
  const [description, docReferences, examples] = await Promise.all([
    readFile(join(path, 'readme', 'description.md'), { encoding: 'utf8' }),
    readFile(join(path, 'readme', 'doc-references.md'), { encoding: 'utf8' }),
    readFile(join(path, 'readme', 'examples.md'), { encoding: 'utf8' }),
  ]);

  const methods = modules.map(({ name }) => `[${name}](https://tokimon.github.io/jsfns/${packageName}#${name})`).join(', ');

  const data: ejs.Data = {
    packageName,
    description,
    docReferences,
    examples,
    methods,
  };

  const content = await ejs.renderFile(resolve('templates', 'readme.ejs'), data, {
    async: true,
  });

  await writeFile(join(path, 'README.md'), content);
};

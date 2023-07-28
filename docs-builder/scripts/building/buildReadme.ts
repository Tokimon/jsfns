import ejs from 'ejs';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { join, resolve } from 'path';

type BuildReadmeProps = {
  path: string;
  packageName: string;
};

export const buildReadme = async ({ path, packageName }: BuildReadmeProps) => {
  const [description, docReferences, examples] = await Promise.all([
    readFile(join(path, 'readme', 'description.md'), { encoding: 'utf8' }),
    readFile(join(path, 'readme', 'doc-references.md'), { encoding: 'utf8' }),
    readFile(join(path, 'readme', 'examples.md'), { encoding: 'utf8' }),
  ]);

  const methods = [];
  const files = await readdir(join(path, 'src'));

  for (const file of files) {
    const name = basename(file, '.ts');
    methods.push(`[${name}](https://tokimon.github.io/jsfns/${packageName}#${name})`);
  }

  const data: ejs.Data = {
    packageName,
    description,
    docReferences,
    examples,
    methods: methods.join(', '),
  };

  const content = await ejs.renderFile(resolve('templates', 'readme.ejs'), data, {
    async: true,
  });

  await writeFile(join(path, 'README.md'), content);
};

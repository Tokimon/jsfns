import ejs from 'ejs';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import * as color from './color';

export async function build() {
  const packagePath = process.cwd();
  const packageName = basename(packagePath);

  const [description, docReferences, examples] = await Promise.all([
    readFile(join(packagePath, 'readme', 'description.md'), { encoding: 'utf8' }),
    readFile(join(packagePath, 'readme', 'doc-references.md'), { encoding: 'utf8' }),
    readFile(join(packagePath, 'readme', 'examples.md'), { encoding: 'utf8' }),
  ]);

  const methods = [];
  const files = await readdir(join(packagePath, 'src'));

  for (const file of files) {
    const name = basename(file, '.ts');
    methods.push(`<a href="https://tokimon.github.io/jsfns/${packageName}#${name}">${name}</a>`);
  }

  const data: ejs.Data = {
    packageName,
    description,
    docReferences,
    examples,
    methods: methods.join('\n'),
  };

  const content = await ejs.renderFile(resolve('..', '..', 'readme-builder', 'template.ejs'), data, { async: true });

  await writeFile(join(packagePath, 'README.md'), content);

  console.log(`${color.green('🗸')} ${color.blue(packageName + '/')}${color.yellow('README.md')} successfully generated`);
}

build().catch(console.error);

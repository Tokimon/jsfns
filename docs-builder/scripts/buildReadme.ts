/* eslint-disable no-console */
import { dirname, join } from 'path';
import { buildReadme } from './building/buildReadme';
import * as color from './utils/color';

async function build() {
  const packageName = process.argv.pop();

  if (!packageName) throw new Error('package name was not given');

  const root = dirname(process.cwd());
  const packagePath = join(root, 'packages', packageName);

  await buildReadme({ path: packagePath, packageName });

  console.log(`${color.green('🗸')} ${color.blue(packageName + '/')}${color.yellow('README.md')} successfully generated`);
}

build().catch(console.error);

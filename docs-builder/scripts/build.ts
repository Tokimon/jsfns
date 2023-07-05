/* eslint-disable no-console */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'path';
import { buildJS } from './building/buildJS';
import { buildReadme } from './building/buildReadme';
import { buildTypedoc } from './building/buildTypedoc';
import { getHighlighCss } from './building/getHighlighCss';
import { getPackageVersions } from './building/getPackageVersions';
import { renderIndex } from './building/renderHtml';
import { getCustomTypesArray } from './type-parsing/findCustomTypes';
import { prepareModules } from './type-parsing/prepareModules';
import { type Kind_Project } from './types';

const RESET = '\x1b[0m';
const BLUE = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';

const color = {
  green: (text: string) => GREEN + text + RESET,
  yellow: (text: string) => YELLOW + text + RESET,
  blue: (text: string) => BLUE + text + RESET,
};

async function build() {
  console.log(color.yellow('\n\n-------------------------------------'));

  const packageName = process.argv.pop();
  if (!packageName) throw new Error('package name was not given');

  console.log(`   Building ${color.yellow('Docs')} for package: ${color.blue(packageName)}`);
  console.log(color.yellow('-------------------------------------\n'));

  const root = dirname(process.cwd());

  const packagePath = join(root, 'packages', packageName);
  const docsPath = join(root, 'docs');

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkgJson = require(join(packagePath, 'package.json')) as { name: string; version: string };
  const highlightCss = await getHighlighCss();

  const docs = buildTypedoc(packagePath) as unknown as Kind_Project;

  const modules = prepareModules(docs.children);
  const { version } = pkgJson;
  const majorVersion = version.replace(/\d+$/, 'x');
  const versionPath = join(docsPath, packageName, majorVersion);

  console.log(`${color.green('🗸')} types parsed`);

  const js = await buildJS();

  console.log(`${color.green('🗸')} JS build`);

  await mkdir(versionPath, { recursive: true });

  await renderIndex({
    template: 'version',
    path: versionPath,
    data: {
      modules,
      packageName,
      version,
      customTypes: getCustomTypesArray(),
      highlightCss,
      js,
    },
  });

  console.log(
    `${color.green('🗸')} ${color.blue(packageName + '/' + majorVersion + '/')}${color.yellow('index.html')} successfully generated`
  );

  const versions = await getPackageVersions(docsPath);

  const indexes = [
    {
      template: 'package',
      path: join(docsPath, packageName),
      data: { packageName, version: versions[packageName][0] },
    },
    {
      template: 'landing',
      path: docsPath,
      data: {
        packages: Object.entries(versions).map(([name, versions]) => ({
          name,
          version: versions[0],
        })),
      },
    },
  ];

  await Promise.all(indexes.map(renderIndex));

  console.log(
    `${color.green('🗸')} ${color.blue(packageName + '/')} and ${color.blue('./')} ${color.yellow('index.html')} successfully generated`
  );

  await buildReadme({ path: packagePath, packageName, modules });

  console.log(`${color.green('🗸')} ${color.blue(packageName + '/')}${color.yellow('README.md')} successfully generated`);
}

build().then(() => {
  console.log(color.yellow('\n-------------------------------------'));

  console.log(color.green('  Documentation generation complete'));
  console.log(color.yellow('-------------------------------------\n\n'));
}, console.error);

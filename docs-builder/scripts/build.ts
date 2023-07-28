/* eslint-disable no-console */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'path';
import { buildJS } from './building/buildJS';
import { buildTypedoc } from './building/buildTypedoc';
import { getHighlighCss } from './building/getHighlighCss';
import { getPackageVersions } from './building/getPackageVersions';
import { renderIndex } from './building/renderHtml';
import { getCustomTypesArray } from './type-parsing/findCustomTypes';
import { prepareModules } from './type-parsing/prepareModules';
import { type Kind_Project } from './types';
import * as color from './utils/color';

async function build() {
  console.log(color.yellow('\n\n-------------------------------------'));

  const packageName = process.argv.pop();
  if (!packageName) throw new Error('package name was not given');

  console.log(`  Building ${color.yellow('Docs')} for package: ${color.blue(packageName)}`);
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

  const allVersions = await getPackageVersions(docsPath);
  const packageVersions = allVersions[packageName];

  await renderIndex({
    template: 'version',
    path: versionPath,
    data: {
      modules,
      packageName,
      displayVersion: version,
      currentVersion: majorVersion,
      versions: packageVersions,
      customTypes: getCustomTypesArray(),
      highlightCss,
      js,
    },
  });

  console.log(
    `${color.green('🗸')} ${color.blue(packageName + '/' + majorVersion + '/')}${color.yellow('index.html')} successfully generated`
  );

  const indexes = [
    {
      template: 'package',
      path: join(docsPath, packageName),
      data: { packageName, version: packageVersions[0] },
    },
    {
      template: 'landing',
      path: docsPath,
      data: {
        packages: Object.entries(allVersions).map(([name, versions]) => ({
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
}

build().then(() => {
  console.log(color.yellow('\n-------------------------------------'));
  console.log(color.green('  Documentation generation complete'));
  console.log(color.yellow('-------------------------------------\n\n'));
}, console.error);

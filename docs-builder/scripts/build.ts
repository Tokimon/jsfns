import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'path';
import { buildTypedoc } from './building/buildTypedoc';
import { getHighlighCss } from './building/getHighlighCss';
import { getPackageVersions } from './building/getPackageVersions';
import { renderIndex } from './building/renderHtml';
import { getCustomTypesArray } from './type-parsing/findCustomTypes';
import { prepareModules } from './type-parsing/prepareModules';
import { Kind_Project } from './types';

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

  const [{ default: pkgJson }, highlightCss] = await Promise.all([
    import('file://' + join(packagePath, 'package.json'), { assert: { type: 'json' } }),
    getHighlighCss(),
  ]);

  const docs = buildTypedoc(packagePath) as unknown as Kind_Project;
  console.log(`${color.green('🗸')} types parsed`);

  const modules = prepareModules(docs.children);
  const { name: npmName, version } = pkgJson;
  const majorVersion = version.replace(/\d+$/, 'x');
  const versionPath = join(docsPath, packageName, majorVersion);

  await mkdir(versionPath, { recursive: true });

  await renderIndex({
    template: 'version',
    path: versionPath,
    data: {
      modules,
      packageName,
      title: `${npmName} v.${majorVersion}`,
      customTypes: getCustomTypesArray(),
      highlightCss,
    },
  });

  console.log(
    `${color.green('🗸')} ${color.blue(packageName + '/' + majorVersion + '/')}${color.yellow(
      'index.html'
    )} successfully generated`
  );

  const versions = await getPackageVersions(docsPath);

  const indexes = [
    {
      template: 'package',
      path: join(docsPath, packageName),
      data: { packageName, version: versions[packageName as keyof typeof versions][0] },
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
    `${color.green('🗸')} ${color.blue(packageName + '/')} and ${color.blue('/')} ${color.yellow(
      'index.html'
    )} successfully generated`
  );
}

build().then(() => {
  console.log(color.yellow('\n-------------------------------------'));

  console.log(color.green('  Documentation generation complete'));
  console.log(color.yellow('-------------------------------------\n\n'));
}, console.error);

import ejs from 'ejs';
import path from 'path';
import { writeFile, readFile } from 'node:fs/promises';
import docs from '~data/docs.json';
import pkgInfo from '~data/package-info.json';
import pkg from '~data/packages.json';
import { prepareModules } from '~/scripts/prepare-modules';
import { Kind_Root } from '~/scripts/types';
import { getArray } from './utils/typeReferences';

const root = docs as Kind_Root;

const { name, version } = pkgInfo;

const templatePath = path.join(process.cwd(), 'templates');
const outputPath = path.join(process.cwd(), 'build');

const modules = prepareModules(root.children);

async function render(template: string, data: ejs.Data, destination: string) {
	const html = await ejs.renderFile(path.join(templatePath, template + '.ejs'), data, {
		async: true
	});
	await writeFile(path.join(outputPath, destination, 'index.html'), html);
}

readFile(require.resolve('highlight.js/styles/github-dark.css')).then((highlightCss) => {
	const versionData = {
		modules,
		packageName: root.name,
		title: `${root.name} v.${version}`,
		customTypes: getArray(),
		highlightCss
	};
	const packageData = { name, version: pkg[name as keyof typeof pkg][0] };
	const landingData = {
		packages: Object.entries(pkg).map(([name, versions]) => ({ name, version: versions[0] }))
	};

	return Promise.all([
		render('version', versionData, path.join(name, version)),
		render('package', packageData, path.join(name)),
		render('landing', landingData, '')
	]);
});

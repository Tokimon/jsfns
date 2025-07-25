import { readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import ejs from 'ejs';
import * as color from './color';

type Summary = {
	lines: { total: 360; covered: 360; skipped: 0; pct: 100 };
	statements: { total: 473; covered: 473; skipped: 0; pct: 100 };
	functions: { total: 105; covered: 105; skipped: 0; pct: 100 };
	branches: { total: 276; covered: 276; skipped: 0; pct: 100 };
};

type CoverageSummary = {
	total: Summary;
	[path: string]: Summary;
};

function calcCoverage({
	total: { lines, statements, functions, branches },
}: CoverageSummary): number {
	return Math.round((lines.pct + statements.pct + functions.pct + branches.pct) / 4);
}

export async function build() {
	const packagePath = process.cwd();
	const packageName = basename(packagePath);

	const coverageSummary: CoverageSummary = require(
		join(packagePath, 'coverage', 'coverage-summary.json'),
	);
	const coverage = calcCoverage(coverageSummary);

	const [description, docReferences, examples] = await Promise.all([
		readFile(join(packagePath, 'readme', 'description.md'), {
			encoding: 'utf8',
		}),
		readFile(join(packagePath, 'readme', 'doc-references.md'), {
			encoding: 'utf8',
		}),
		readFile(join(packagePath, 'readme', 'examples.md'), { encoding: 'utf8' }),
	]);

	const files = await readdir(join(packagePath, 'src'));
	const fileNames = files
		.map((file) => basename(file, '.ts'))
		.filter((name) => !['index', 'types.d'].includes(name));

	const len = fileNames.length;

	const methods = fileNames.reduce((str, name, index) => {
		const n = index + 1;
		const end = n % 4 === 0 || n === len ? '|\n' : '';
		return `${str}| [${name}](https://tokimon.github.io/jsfns-docs/${packageName}#${name}) ${end}`;
	}, '');

	const data: ejs.Data = {
		packageName,
		coverage,
		description,
		docReferences,
		examples,
		methods,
	};

	const content = await ejs.renderFile(
		resolve('..', '..', 'readme-builder', 'template.ejs'),
		data,
		{ async: true },
	);

	await writeFile(join(packagePath, 'README.md'), content);

	console.log(
		`${color.green('\u2713')} ${color.blue(packageName + '/')}${color.yellow('README.md')} successfully generated`,
	);
}

build().catch(console.error);

export type TemplateData = {
	packageName: string;
	coverage: number;
	description: string;
	docReferences: string;
	examples: string;
	methods: string;
};

function coverageColor(coverage: number): string {
	if (coverage > 95) return 'green';
	if (coverage < 75) return 'red';
	return 'yellow';
}

export function template({
	packageName,
	coverage,
	description,
	docReferences,
	examples,
	methods,
}: TemplateData): string {
	return `# @jsfns/${packageName}
![Code Coverage ${coverage}](https://badgen.net/badge/coverage/${coverage}%25/${coverageColor(coverage)})

<a href="https://tokimon.github.io/jsfns/${packageName}" target="__blank" style="font-size: 50px; display: block; text-align: center;">@jsfns/${packageName} documentation</a>

${description}

## Available methods

<table>
${methods}
</table>

${docReferences}

## ES version support

These packages use modern JavaScript with no bundled polyfills or
fallbacks. If you need to support older runtimes, add polyfills through
your build pipeline (Babel, core-js, etc.) — most are injected
automatically. Keeping the library polyfill-free makes it leaner and
more future-proof, since modern browsers and Node versions already cover
the vast majority of features.

## Installation

\`\`\`
npm i @jsfns/${packageName}
\`\`\`

\`\`\`
yarn add @jsfns/${packageName}
\`\`\`

\`\`\`
pnpm i @jsfns/${packageName}
\`\`\`

\`\`\`
bun add @jsfns/${packageName}
\`\`\`

## Usage

${examples}

## Something missing?

Questions, bugs, or ideas for new functionality? Open an
[issue](https://github.com/Tokimon/jsfns/issues), or submit a
[pull request](https://github.com/Tokimon/jsfns/pulls) with your
contribution.
`;
}

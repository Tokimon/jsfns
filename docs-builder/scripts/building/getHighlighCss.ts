import { readFile } from 'node:fs/promises';

export const getHighlighCss = () =>
  readFile(require.resolve('highlight.js/styles/github-dark.css'));

import { result, TestInput } from './assets/result';
import { surround } from './assets/surround';

import phrasify, { PhrasifySettings } from '../src/phrasify';



const emptyObj = {};
const space42 = surround('42', ' ');



const phrases: TestInput<PhrasifySettings>[] = [
  ['', ''],

  ['Multiple   spaces   in  phrase', 'Multiple spaces in phrase'],
  ['/some/path/someWhere', 'some path some Where'],

  ['ABBR in the beginning', 'ABBR in the beginning'],
  ['ABBRInWord', 'ABBR In Word'],
  ['Num42in the middle', ({ numbers }) => `Num${space42(numbers)}in the middle`],
  ['42in the beginning', ({ numbers }) => `${space42(numbers, true)}in the beginning`],
  ['42 alone', '42 alone'],

  ['camelCase', 'camel Case'],
  ['PascalCase', 'Pascal Case'],
  ['snake_case', 'snake case'],
  ['kebab-case', 'kebab case'],
  ['-kebab-case-', 'kebab case'],

  ['word', 'word'],
  ['Name', 'Name'],

  ['data-ABBR42number space', ({ numbers }) => `data ABBR${space42(numbers)}number space`],
  ['Look! 99 ? ABBR #Test', 'Look 99 ABBR Test']
];

describe('"phrasify"', () => {
  describe('Passing a string directly', () => {
    describe('Convert a phrase into a lower PascalCased word (using default settings)', () => {
      it.each(phrases)('"%s"', (input, output) => {
        expect(phrasify(input)).toBe(result(output));
      });
    });
  });

  describe('Passing a config object', () => {
    describe.each([
      emptyObj,
      { numbers: true },
      { numbers: false }
    ] as PhrasifySettings[])('%s', (conf) => {
      it.each(phrases)('"%s"', (input, output) => {
        expect(phrasify(input, conf)).toBe(result(output, conf));
      });
    });
  });
});

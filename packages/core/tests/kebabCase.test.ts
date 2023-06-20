import { result, TestInput } from './assets/result';
import { surround } from './assets/surround';

import kebabCase, { KebabCaseSettings } from '~core/kebabCase';

const emptyObj = {};
const surround42 = surround('42', '-');

const phrases: TestInput<KebabCaseSettings>[] = [
  ['', ''],

  ['Multiple   spaces   in  phrase', 'multiple-spaces-in-phrase'],
  ['/some/path/someWhere', 'some-path-some-where'],

  ['ABBR in the beginning', 'abbr-in-the-beginning'],
  ['ABBRInWord', 'abbr-in-word'],
  ['Num42in the middle', ({ numbers }) => `num${surround42(numbers)}in-the-middle`],
  ['42in the beginning', ({ numbers }) => `${surround42(numbers, true)}in-the-beginning`],
  ['42 alone', '42-alone'],

  ['camelCase', 'camel-case'],
  ['PascalCase', 'pascal-case'],
  ['snake_case', 'snake-case'],
  ['kebab-case', 'kebab-case'],

  ['word', 'word'],
  ['Name', 'name'],

  ['data-ABBR42number space', ({ numbers }) => `data-abbr${surround42(numbers)}number-space`],
  ['Look! 99 ? ABBR #Test', 'look-99-abbr-test'],
];

describe('"kebabCase"', () => {
  describe('Passing a string directly', () => {
    describe('Convert a phrase into a lower PascalCased word (using default settings)', () => {
      it.each(phrases)('"%s"', (input, output) => {
        expect(kebabCase(input)).toBe(result(output));
      });
    });
  });

  describe('Passing a config object', () => {
    describe.each([emptyObj, { numbers: true }, { numbers: false }] as KebabCaseSettings[])('%s', (conf) => {
      it.each(phrases)('"%s"', (input, output) => {
        expect(kebabCase(input, conf)).toBe(result(output, conf));
      });
    });
  });
});

import { SnakeCaseSettings, snakeCase } from '@js-fns/core/snakeCase';
import { TestInput, result } from './assets/result';
import { surround } from './assets/surround';

const emptyObj = {};
const surround42 = surround('42', '_');

const phrases: TestInput<SnakeCaseSettings>[] = [
  ['', ''],

  ['Multiple   spaces   in  phrase', 'multiple_spaces_in_phrase'],
  ['/some/path/someWhere', 'some_path_some_where'],

  ['ABBR in the beginning', 'abbr_in_the_beginning'],
  ['ABBRInWord', 'abbr_in_word'],
  ['Num42in the middle', ({ numbers }) => `num${surround42(numbers)}in_the_middle`],
  ['42in the beginning', ({ numbers }) => `${surround42(numbers, true)}in_the_beginning`],
  ['42 alone', '42_alone'],

  ['camelCase', 'camel_case'],
  ['PascalCase', 'pascal_case'],
  ['snake_case', 'snake_case'],
  ['kebab-case', 'kebab_case'],

  ['word', 'word'],
  ['Name', 'name'],

  ['data-ABBR42number space', ({ numbers }) => `data_abbr${surround42(numbers)}number_space`],
  ['Look! 99 ? ABBR #Test', 'look_99_abbr_test'],
];

describe('"snakeCase"', () => {
  describe('Passing a string directly', () => {
    describe('Convert a phrase into a lower PascalCased word (using default settings)', () => {
      it.each(phrases)('"%s"', (input, output) => {
        expect(snakeCase(input)).toBe(result(output));
      });
    });
  });

  describe('Passing a config object', () => {
    describe.each([emptyObj, { numbers: true }, { numbers: false }] as SnakeCaseSettings[])('%s', (conf) => {
      it.each(phrases)('"%s"', (input, output) => {
        expect(snakeCase(input, conf)).toBe(result(output, conf));
      });
    });
  });
});

import createBooleanSettings from './assets/createBooleanSettings';
import firstUpper from './assets/firstUpper';
import { result, TestInput } from './assets/result';

import camelCase, { CamelCaseSettings, defaultSettings } from '~core/camelCase';

const emptyObj = {};
const settingsKeys = Object.keys(defaultSettings) as (keyof CamelCaseSettings)[];

const afterNum = (str: string, numbers?: boolean) => {
  str = str.toLowerCase();
  return numbers ? firstUpper(str) : str;
};

const abbrev = (abbr?: boolean, inBeginning?: true) => {
  let str = 'ABBR';
  if (abbr) {
    return str;
  }

  str = str.toLowerCase();
  return inBeginning ? str : firstUpper(str);
};

const phrases: TestInput<CamelCaseSettings>[] = [
  ['', ''],

  ['Multiple   spaces   in  phrase', 'multipleSpacesInPhrase'],
  ['/some/path/someWhere', 'somePathSomeWhere'],

  ['With ABBR in the middle', ({ abbr }) => `with${abbrev(abbr)}InTheMiddle`],
  ['ABBR in the beginning', ({ abbr }) => `${abbrev(abbr, true)}InTheBeginning`],
  ['ABBRInWord', ({ abbr }) => `${abbrev(abbr, true)}InWord`],

  ['Num42in the middle', ({ numbers = true }) => `num42${afterNum('in', numbers)}TheMiddle`],
  ['42in the beginning', ({ numbers = true }) => `42${afterNum('in', numbers)}TheBeginning`],
  ['42 alone', '42Alone'],

  ['camelCase', 'camelCase'],
  ['PascalCase', 'pascalCase'],
  ['snake_case', 'snakeCase'],
  ['kebab-case', 'kebabCase'],

  ['word', 'word'],
  ['Name', 'name'],

  ['data-ABBR42number space', ({ numbers = true, abbr }) => `data${abbrev(abbr)}42${afterNum('number', numbers)}Space`],
  ['Look! 99 ? ABBR #Test', ({ abbr }) => `look99${abbrev(abbr)}Test`],
];

describe('"camelCase"', () => {
  describe('Passing a string directly', () => {
    describe('Convert a phrase into a lower camelCased word (using default settings)', () => {
      it.each(phrases)('"%s"', (input, output) => {
        expect(camelCase(input)).toBe(result(output, defaultSettings));
      });
    });
  });

  describe('Passing a config object', () => {
    describe.each([emptyObj, ...createBooleanSettings<CamelCaseSettings>(settingsKeys)] as CamelCaseSettings[])('%s', (conf) => {
      const settings = emptyObj === conf ? defaultSettings : conf;

      it.each(phrases)('"%s"', (input, output) => {
        let out = result(output, settings);
        if (conf.upper) {
          out = firstUpper(out);
        }

        expect(camelCase(input, settings)).toBe(out);
      });
    });
  });
});

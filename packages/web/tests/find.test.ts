import { jest } from '@jest/globals';
import type { SpyInstance } from 'jest-mock';
import { find } from '@js-fns/web/find';

describe('"find"', () => {
  function suite(findCall: (selector: string) => ReturnType<typeof find>, elm: Document | HTMLElement) {
    it('Uses `getElementsByTagName` when selector is a tag name ', () => {
      const tagNameSpy = jest.spyOn(elm, 'getElementsByTagName');

      findCall('div');
      expect(tagNameSpy).toHaveBeenCalledWith('div');

      tagNameSpy.mockRestore();
    });

    it('Uses `getElementById` when selector is an ID', () => {
      const idSpy = jest.spyOn(document, 'getElementById');

      findCall('#MyId');
      expect(idSpy).toHaveBeenCalledWith('MyId');

      idSpy.mockRestore();
    });

    describe('Uses `getElementsByClassName` when selector is:', () => {
      let classSpy: SpyInstance<typeof elm.getElementsByClassName>;

      beforeAll(() => {
        classSpy = jest.spyOn(elm, 'getElementsByClassName');
      });

      beforeEach(() => classSpy.mockClear());

      afterAll(() => classSpy.mockRestore());

      it('Single class selector', () => {
        findCall('.item');
        expect(classSpy).toHaveBeenCalledWith('item');
      });

      it('Multi class selector', () => {
        findCall('.item.first');
        expect(classSpy).toHaveBeenCalledWith('item first');
      });
    });

    describe('Uses `querySelectorAll` when selector:', () => {
      let querySpy: SpyInstance<typeof elm.querySelectorAll>;

      const testQuery = (query: string) => {
        querySpy.mockClear();
        findCall(query);
        expect(querySpy).toHaveBeenCalledWith(query);
      };

      beforeAll(() => {
        querySpy = jest.spyOn(elm, 'querySelectorAll');
      });

      afterAll(() => querySpy.mockRestore());

      it('Contains ` ` (space)', () => testQuery('div p'));
      it('Contains `>` (child selector)', () => testQuery('div > p'));
      it('Contains `+` (next sibling selector)', () => testQuery('div + p'));
      it('Contains `~` (all next sibling selector)', () => testQuery('div ~ p'));
      it('Contains `:` (pseudo selector)', () => testQuery('div:first-child'));
      it('Contains `[` (attribute selector)', () => testQuery('div[name="test"]'));
      it('Contains `,` (multiple selectors)', () => testQuery('div, p'));

      it.each(['#MyId.item', 'div.item', '.item#MyId', '.item .child'])('Mixed selector: %s', (selector) => {
        testQuery(selector);
      });
    });
  }

  describe('With only selector defined', () => {
    suite((selector) => find(selector), document);
  });

  describe('With element and selector defined', () => {
    suite((selector) => find(document.body, selector), document.body);
  });
});

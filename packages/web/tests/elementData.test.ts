import { elementData, resetCache } from '@js-fns/web/elementData';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('ElementData');

describe('"elementData"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => resetCache());

  afterAll(() => removeElement(testNode));

  describe('Stores given data under the given key for a given element', () => {
    const data = [
      ['null', null],
      ['object', { a: 1 }],
      ['array', [1]],
      ['string', 'string'],
      ['number', 1],
      ['boolean', true],
    ] as const;

    beforeAll(() => {
      resetCache();
      data.forEach(([key, value]) => elementData(testNode, key, value));
    });

    afterAll(resetCache);

    test('Get all stored data', () => {
      const obj = data.reduce<Record<string, unknown>>((o, [key, value]) => {
        o[key] = value;
        return o;
      }, {});

      expect(elementData(testNode)).toBe(obj);
    });

    test.each(data)('Retrieves data for the given key: %s', (key, value) => {
      expect(elementData(testNode, key)).toBe(value);
    });
  });

  describe('Returns undefined when', () => {
    beforeAll(resetCache);
    afterAll(resetCache);

    it('No data is stored for the given element', () => {
      expect(elementData(testNode)).toBeUndefined();
    });

    it('No data is stored with the given key for the given element', () => {
      elementData(testNode, 'stuff', 'value');
      expect(elementData(testNode, 'key')).toBeUndefined();
    });
  });
});

import isObject from '@js-fns/core/isObject';

class TestObj {
  name = '';
  constructor(name: string) {
    this.name = name;
  }
}

// eslint-disable-next-line no-new-object
const O = new Object();
const Test = new TestObj('test');

describe('"isObject"', () => {
  describe('Returns `true` for Object values', () => {
    it.each([{}, O, Object.create({}), Test])('"%s"', (n) => {
      expect(isObject(n)).toBe(true);
    });
  });

  describe('Returns `false` for non Object values', () => {
    it.each([null, 'Object', [], 123, NaN, undefined, TestObj])('"%s"', (n) => {
      expect(isObject(n)).toBe(false);
    });
  });
});

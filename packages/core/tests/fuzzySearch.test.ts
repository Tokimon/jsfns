import { fuzzySearch } from '@jsfns/core/fuzzySearch';

describe('"fuzzySearch"', () => {
  const input = 'cartwheel';

  it.each([
    ['twl', true],
    ['cart', true],
    ['cw', true],
    ['ee', true],
    ['art', true],
    [input, true],
    [input + 's', false],
    ['wheely', false],
    ['cartman', false],
    ['eeel', false],
    ['dog', false],
  ])(`"%s" in "${input}" === %s`, (search, assertion) => {
    expect(fuzzySearch(input, search)).toBe(assertion);
  });

  describe('Case insensitive by default', () => {
    it.each([
      ['WHEEL', true],
      ['wheel', true],
      ['cArT', true],
      ['cart', true],
      [input.toUpperCase(), true],
    ])(`"%s" in "${input}" === %s`, (search, assertion) => {
      expect(fuzzySearch(input, search)).toBe(assertion);
    });
  });

  describe('options', () => {
    describe('caseSensitive = true', () => {
      it.each([
        ['WHEEL', false],
        ['wheel', true],
        ['cArT', false],
        ['cart', true],
        [input.toUpperCase(), false],
        [input, true],
      ])(`"%s" in "${input}" === %s`, (search, assertion) => {
        expect(fuzzySearch(input, search, { caseSensitive: true })).toBe(assertion);
      });
    });
  });
});

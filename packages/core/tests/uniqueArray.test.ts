import uniqueArray from '~core/uniqueArray';



describe('"uniqueArray"', () => {
  const obj = {};

  it('Does nothing to an empty array', () => {
    expect(uniqueArray([])).toEqual([]);
  });

  describe('Filter out duplicate items in the array', () => {
    it.each([
      ['Numbers', [1, 2, 1, 3, 3, 2, 1], [1, 2, 3]],
      ['Strings', ['a', 'c', 'b', 'c', 'a'], ['a', 'c', 'b']],
      ['Objects', [obj, obj, obj, {}, {}], [obj, {}, {}]],
      ['Mixed values', [[1, 2], 1, 'a', 'a', obj, obj], [[1, 2], 1, 'a', obj]],
      ['No deep check', [[1, 2, 1], [1, 2, 2], [1, 2, 3]], [[1, 2, 1], [1, 2, 2], [1, 2, 3]]]
    ])('%s', (_, arr, result) => {
      expect(uniqueArray(arr)).toEqual(result);
    });
  });
});

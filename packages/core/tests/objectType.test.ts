import objectType from '../src/objectType';



describe('"objectType"', () => {
  describe('Returns the name of the given object', () => {
    it.each([
      ['object', {}],
      ['null', null],
      ['undefined', undefined],
      ['string', ''],
      ['number', 0]
    ])('%s', (name, value) => {
      expect(objectType(value)).toBe(name);
    });
  });
});

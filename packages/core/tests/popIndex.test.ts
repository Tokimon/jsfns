import popIndex, { popIndexPure } from '~core/popIndex';

describe('"popIndex"', () => {
  describe('"popIndex"', () => {
    it('Returns the value a the given index', () => {
      expect(popIndex([1, 2, 3], 1)).toBe(2);
    });

    it('Removes the value a the given index from the given array', () => {
      const a = [1, 2, 3];
      popIndex(a, 1);
      expect(a).toEqual([1, 3]);
    });

    describe.each([-1, 10])('When index is out of bounds: %i', (index) => {
      it('Returns undefined', () => {
        expect(popIndex([1, 2, 3], index)).toBe(undefined);
      });

      it('Does not alter the given array', () => {
        const a = [1, 2, 3];
        popIndex(a, index);
        expect(a).toEqual(a);
      });
    });
  });

  describe('"popIndexPure"', () => {
    it('Removes the value a the given index from the given array', () => {
      expect(popIndexPure([1, 2, 3], 1)).toEqual([2, [1, 3]]);
    });

    describe.each([-1, 10])('When index is out of bounds: %i', (index) => {
      it('Returns undefined', () => {
        const a = [1, 2, 3];
        expect(popIndexPure(a, index)).toEqual([undefined, a]);
      });

      it('Does not alter the given array', () => {
        const a = [1, 2, 3];
        expect(popIndexPure(a, index)[1]).toBe(a);
      });
    });
  });
});

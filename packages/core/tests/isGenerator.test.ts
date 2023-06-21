import { isGenerator, isGeneratorFunction } from '@js-fns/core/isGenerator';

describe('"isGenerator"', () => {
  const generatorMock = {
    next: () => undefined,
    throw: () => undefined,
    return: () => undefined,
    // [Symbol.iterator]: () => undefined
  };

  describe('Default export', () => {
    it('Returns `true` for Generator', () => {
      expect(
        isGeneratorFunction(function* () {
          yield '';
        })
      ).toBe(true);
    });

    describe('Returns `false` for non Generator', () => {
      it.each([
        ['Null', null],
        [
          'Normal Function',
          function () {
            return undefined;
          },
        ],
        ['Generator Like', generatorMock],
        ['Object containing "next"', { next: (): void => undefined }],
        ['Object containing "throw"', { throw: (): void => undefined }],
      ])('%s', (_, fn) => {
        expect(isGeneratorFunction(fn)).toBe(false);
      });
    });
  });

  describe('"isGenerator"', () => {
    describe('Returns `true` for', () => {
      it('An activated generator', () => {
        expect(
          isGenerator(
            (function* () {
              yield '';
            })()
          )
        ).toBe(true);
      });

      it('Objects that implements `next` and `throw` functions', () => {
        expect(isGenerator(generatorMock)).toBe(true);
      });
    });

    describe('Returns `false` for non Generator Like Objects:', () => {
      it.each([
        ['Null', null],
        [
          'Normal Function',
          function () {
            return undefined;
          },
        ],
        ['Object containing "next"', { next: (): void => undefined }],
        ['Object containing "throw"', { throw: (): void => undefined }],
      ])('%s', (_, fn) => {
        expect(isGenerator(fn)).toBe(false);
      });
    });
  });
});

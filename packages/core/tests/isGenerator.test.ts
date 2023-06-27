import { isGenerator, isGeneratorLike } from '@jsfns/core/isGenerator';

describe('"isGenerator"', () => {
  const generatorMock = {
    next: () => undefined,
    throw: () => undefined,
    return: () => undefined,
    // [Symbol.iterator]: () => undefined
  };

  describe('"isGenerator', () => {
    it('Returns `true` for Generator', () => {
      expect(
        isGenerator(function* () {
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
        expect(isGenerator(fn)).toBe(false);
      });
    });
  });

  describe('"isGeneratorLike"', () => {
    describe('Returns `true` for', () => {
      it('An activated generator', () => {
        expect(
          isGeneratorLike(
            (function* () {
              yield '';
            })()
          )
        ).toBe(true);
      });

      it('Objects that implements `next` and `throw` functions', () => {
        expect(isGeneratorLike(generatorMock)).toBe(true);
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
        expect(isGeneratorLike(fn)).toBe(false);
      });
    });
  });
});

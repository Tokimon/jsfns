import crypto from 'node:crypto';
import { randomCryptoId } from '@js-fns/core/randomCryptoId';

describe('"randomCryptoId"', () => {
  const hasCrypto = typeof globalThis.crypto !== 'undefined';

  beforeAll(() => {
    if (!hasCrypto) {
      Object.defineProperty(globalThis, 'crypto', {
        value: crypto,
      });
    }
  });

  it('Generates a random id of default length', () => {
    expect(randomCryptoId()).toMatch(/^[a-z0-9]{10}$/);
  });

  it('Generates a random id of specific length', () => {
    expect(randomCryptoId(100)).toMatch(/^[a-z0-9]{100}$/);
  });

  it('Always generate and id with a length of minimum 2', () => {
    expect(randomCryptoId(1)).toMatch(/^[a-z0-9]{2}$/);
    expect(randomCryptoId(0)).toMatch(/^[a-z0-9]{2}$/);
    expect(randomCryptoId(-100)).toMatch(/^[a-z0-9]{2}$/);
  });
});

import { randomId } from '@jsfns/core/randomId';

describe('"randomId"', () => {
  it('Generates a random id of default length', () => {
    expect(randomId()).toMatch(/[a-z0-9]{10}/);
  });

  it('Generates a random id of specific length', () => {
    expect(randomId(100)).toMatch(/[a-z0-9]{100}/);
  });

  it('Always generate and id with a length of minimum 2', () => {
    expect(randomId(1)).toMatch(/^[a-z0-9]{2}$/);
    expect(randomId(0)).toMatch(/^[a-z0-9]{2}$/);
    expect(randomId(-100)).toMatch(/^[a-z0-9]{2}$/);
  });
});

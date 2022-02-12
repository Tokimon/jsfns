import randomId from '../src/randomId';



describe('"randomId"', () => {
  it('Generates a random id of default length', () => {
    expect(randomId()).toMatch(/[a-z0-9]{10}/);
  });

  it('Generates a random id of specific length', () => {
    expect(randomId(100)).toMatch(/[a-z0-9]{100}/);
  });

  it('Generates an empty id when a negative length is given', () => {
    expect(randomId(-100)).toBe('');
  });
});

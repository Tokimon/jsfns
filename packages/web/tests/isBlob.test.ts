import isBlob from '~web/isBlob';



describe('"isBlob"', () => {
  it('Returns `true` for Blob objects', () => {
    expect(isBlob(new Blob())).toBe(true);
  });

  it.each([
    null,
    {},
    123,
    'blob'
  ])('Returns `false` for non Blob objects', (val) => {
    expect(isBlob(val)).toBe(false);
  });
});

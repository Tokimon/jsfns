import minMax from '~core/minMax';



describe('"minMax"', () => {
  it('Limits a number to the given minimum value', () => {
    expect(minMax(0, 10, 20)).toBe(10);
  });

  it('Limits a number to the given maximum value', () => {
    expect(minMax(200, 10, 20)).toBe(20);
  });

  it('Returns the given number as is, when it is within the given range', () => {
    expect(minMax(15, 10, 20)).toBe(15);
  });
});

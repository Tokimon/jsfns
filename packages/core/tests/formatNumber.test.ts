import formatNumber from '../src/formatNumber';



describe('"formatNumber"', () => {
  const num = 1100.234;
  it('Formats number with default settings', () => {
    expect(formatNumber(num)).toBe('1.100,23');
  });

  it.each([
    [{ thousand: '|' }, '1|100,23'],
    [{ decimal: '|' }, '1.100|23'],
    [{ thousand: '-', decimal: '#' }, '1-100#23']
  ])('Formats number with given separator configuration: %s', (config, output) => {
    expect(formatNumber(1100.234, config)).toBe(output);
  });

  it.each([
    [1, '1.100,2'],
    ['>4', '1.100,2340'],
    ['<2', '1.100,23']
  ])('Format the decimals (using "limitDecimals" expressions): %s', (decimals, output) => {
    expect(formatNumber(1100.234, { decimals })).toBe(output);
  });
});
